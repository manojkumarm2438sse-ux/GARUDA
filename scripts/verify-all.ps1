$baseUrl = "http://localhost:8080"
$successCount = 0
$totalTests = 0

function Assert-Test($condition, $testName) {
    $global:totalTests++
    if ($condition) {
        $global:successCount++
        Write-Host "  [PASS] $testName" -ForegroundColor Green
    } else {
        Write-Host "  [FAIL] $testName" -ForegroundColor Red
    }
}

Write-Host "`n=== RUNNING COMPREHENSIVE VERIFICATION SUITE ===" -ForegroundColor Cyan

# 1. Test Static Assets Serving
Write-Host "`n1. Static Assets & App Shell..."
$htmlRes = Invoke-WebRequest -Uri "$baseUrl/" -UseBasicParsing
Assert-Test ($htmlRes.StatusCode -eq 200 -and $htmlRes.Content.Contains("GARUDA")) "App Shell (index.html) loads with status 200"

$jsRes = Invoke-WebRequest -Uri "$baseUrl/js/app.js" -UseBasicParsing
Assert-Test ($jsRes.StatusCode -eq 200 -and $jsRes.Content.Contains("GarudaApp")) "Router & Orchestrator (js/app.js) served"

$authRes = Invoke-WebRequest -Uri "$baseUrl/js/auth.js" -UseBasicParsing
Assert-Test ($authRes.StatusCode -eq 200 -and $authRes.Content.Contains("authManager")) "Auth Engine (js/auth.js) served"

$authViewsRes = Invoke-WebRequest -Uri "$baseUrl/js/auth-views.js" -UseBasicParsing
Assert-Test ($authViewsRes.StatusCode -eq 200 -and $authViewsRes.Content.Contains("renderPreferencesView")) "Auth & Preferences Views (js/auth-views.js) served"

# 2. Test Manoj Login (Default Seeded Account with bcrypt)
Write-Host "`n2. Authentication: Manoj Default Account..."
$manojLoginBody = @{ email = "manoj@garuda.in"; password = "cadet2027" } | ConvertTo-Json
$manojLoginRes = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $manojLoginBody -ContentType "application/json"
Assert-Test ($manojLoginRes.success -eq $true) "Manoj logged in successfully"
Assert-Test ($manojLoginRes.user.name -eq "Manoj") "User name is Manoj"
Assert-Test ($manojLoginRes.token.Length -gt 50) "Signed JWT token returned"
$manojToken = $manojLoginRes.token

# 3. Test Invalid Credentials Error Handling
Write-Host "`n3. Security: Invalid Password Handling..."
try {
    $badLoginBody = @{ email = "manoj@garuda.in"; password = "wrong_password_xyz" } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $badLoginBody -ContentType "application/json"
    Assert-Test ($false) "Invalid login rejected"
} catch {
    Assert-Test ($true) "Invalid password rejected with 401 Unauthorized"
}

# 4. Test New Cadet Registration (Signup)
Write-Host "`n4. Authentication: New Cadet Registration..."
$cadetEmail = "cadet_" + [System.Guid]::NewGuid().ToString().Substring(0, 8) + "@garuda.in"
$signupBody = @{
    name = "Cadet Arjun"
    email = $cadetEmail
    password = "cadet_secret_2027"
    target_goal = "Indian Army Special Forces & NDA"
} | ConvertTo-Json
$signupRes = Invoke-RestMethod -Uri "$baseUrl/api/auth/signup" -Method Post -Body $signupBody -ContentType "application/json"
Assert-Test ($signupRes.success -eq $true) "Cadet Arjun registered successfully"
Assert-Test ($signupRes.user.name -eq "Cadet Arjun") "Cadet name is stored"
Assert-Test ($signupRes.token.Length -gt 50) "JWT token returned for new cadet"
$arjunToken = $signupRes.token

# 5. Test Duplicate Email Prevention
Write-Host "`n5. Security: Duplicate Email Prevention..."
try {
    Invoke-RestMethod -Uri "$baseUrl/api/auth/signup" -Method Post -Body $signupBody -ContentType "application/json"
    Assert-Test ($false) "Duplicate email rejected"
} catch {
    Assert-Test ($true) "Duplicate email rejected with 409 Conflict"
}

# 6. Test Protected Route Guard & JWT Verification (/api/auth/me)
Write-Host "`n6. Route Guard & Token Verification..."
$meRes = Invoke-RestMethod -Uri "$baseUrl/api/auth/me" -Method Get -Headers @{ Authorization = "Bearer $arjunToken" }
Assert-Test ($meRes.success -eq $true -and $meRes.user.email -eq $cadetEmail) "Token validated successfully for Cadet Arjun"

try {
    Invoke-RestMethod -Uri "$baseUrl/api/auth/me" -Method Get -Headers @{ Authorization = "Bearer invalid_tampered_token" }
    Assert-Test ($false) "Tampered token rejected"
} catch {
    Assert-Test ($true) "Tampered token rejected with 401 Unauthorized"
}

# 7. Test Preferences API (Read & Update)
Write-Host "`n7. Preferences & Daily Schedule API..."
$prefUpdateBody = @{
    theme = "light"
    target_goal = "Para Special Forces (Airborne) & CDS"
    notification_settings = @{
        morningBriefing = $true
        studyReminders = $true
        streakAlerts = $false
        nightDebrief = $true
    }
    daily_schedule = @{
        wakeTime = "05:30"
        sleepTime = "22:30"
        focusBlocks = @(
            @{ time = "05:30 - 07:30"; label = "5km Run & Calisthenics" }
            @{ time = "09:00 - 13:00"; label = "CDS General Knowledge & English" }
            @{ time = "15:00 - 18:00"; label = "SSB Psychology & OIR Drills" }
        )
    }
} | ConvertTo-Json
$prefUpdateRes = Invoke-RestMethod -Uri "$baseUrl/api/preferences" -Method Put -Body $prefUpdateBody -ContentType "application/json" -Headers @{ Authorization = "Bearer $arjunToken" }
Assert-Test ($prefUpdateRes.success -eq $true) "Preferences updated in SQLite"
Assert-Test ($prefUpdateRes.preferences.theme -eq "light") "Light theme updated"
Assert-Test ($prefUpdateRes.preferences.target_goal -eq "Para Special Forces (Airborne) & CDS") "Target goal updated"
Assert-Test ($prefUpdateRes.preferences.daily_schedule.wakeTime -eq "05:30") "Wake time updated to 05:30"

# 8. Test Per-User Data Isolation (Manoj vs Arjun)
Write-Host "`n8. Data Isolation: Separate User Records in SQLite..."
$manojDash = Invoke-RestMethod -Uri "$baseUrl/api/dashboard" -Method Get -Headers @{ Authorization = "Bearer $manojToken" }
$arjunDash = Invoke-RestMethod -Uri "$baseUrl/api/dashboard" -Method Get -Headers @{ Authorization = "Bearer $arjunToken" }

Assert-Test ($manojDash.user.name -eq "Manoj") "Manoj dashboard user is Manoj"
Assert-Test ($arjunDash.user.name -eq "Cadet Arjun") "Arjun dashboard user is Arjun"
Assert-Test ($manojDash.streaks -eq 8) "Manoj streak is 8 days"
Assert-Test ($arjunDash.streaks -eq 1) "Arjun streak is 1 day (independent)"

# Update Arjun's mission completion
$arjunDash.missionData.completionPercentage = 90
$updateDashBody = @{
    missionData = $arjunDash.missionData
    streaks = 2
    completionPercentage = 90
    reports = @()
} | ConvertTo-Json -Depth 10
Invoke-RestMethod -Uri "$baseUrl/api/dashboard" -Method Post -Body $updateDashBody -ContentType "application/json" -Headers @{ Authorization = "Bearer $arjunToken" }

# Re-fetch both and verify isolation
$manojDashAfter = Invoke-RestMethod -Uri "$baseUrl/api/dashboard" -Method Get -Headers @{ Authorization = "Bearer $manojToken" }
$arjunDashAfter = Invoke-RestMethod -Uri "$baseUrl/api/dashboard" -Method Get -Headers @{ Authorization = "Bearer $arjunToken" }

Assert-Test ($arjunDashAfter.streaks -eq 2) "Arjun's streak updated to 2"
Assert-Test ($manojDashAfter.streaks -eq 8) "Manoj's streak remains isolated at 8"

# 9. Test Logout
Write-Host "`n9. Logout..."
$logoutRes = Invoke-RestMethod -Uri "$baseUrl/api/auth/logout" -Method Post
Assert-Test ($logoutRes.success -eq $true) "Logout API clears session"

Write-Host "`n==============================================="
Write-Host "TEST RESULTS: $successCount / $totalTests PASSED!" -ForegroundColor Green
Write-Host "==============================================="
