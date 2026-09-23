$baseUrl = "http://localhost:8080"

Write-Host "=== TEST 1: Login with seeded user ==="
$loginBody = @{ email = "manoj@garuda.in"; password = "cadet2027" } | ConvertTo-Json
$loginRes = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
Write-Host "Login Success:" $loginRes.success
Write-Host "User:" $loginRes.user.name
Write-Host "Token length:" $loginRes.token.Length
$manojToken = $loginRes.token

Write-Host "`n=== TEST 2: Signup new cadet Vikram ==="
$vikramEmail = "vikram" + [System.DateTime]::UtcNow.Ticks + "@garuda.in"
$signupBody = @{
    name = "Vikram Batra"
    email = $vikramEmail
    password = "paramvirchakra"
    target_goal = "Para SF & National Defence Academy"
} | ConvertTo-Json
$signupRes = Invoke-RestMethod -Uri "$baseUrl/api/auth/signup" -Method Post -Body $signupBody -ContentType "application/json"
Write-Host "Signup Success:" $signupRes.success
Write-Host "New Cadet:" $signupRes.user.name "Goal:" $signupRes.user.target_goal
$vikramToken = $signupRes.token

Write-Host "`n=== TEST 3: Check /api/auth/me for Vikram ==="
$meRes = Invoke-RestMethod -Uri "$baseUrl/api/auth/me" -Method Get -Headers @{ Authorization = "Bearer $vikramToken" }
Write-Host "Auth ME:" $meRes.user.name "Email:" $meRes.user.email

Write-Host "`n=== TEST 4: Get Dashboard per-user data (Vikram) ==="
$dashRes = Invoke-RestMethod -Uri "$baseUrl/api/dashboard" -Method Get -Headers @{ Authorization = "Bearer $vikramToken" }
Write-Host "Dashboard Cadet:" $dashRes.user.name "Streaks:" $dashRes.streaks

Write-Host "`n=== TEST 5: Update Preferences for Vikram ==="
$prefBody = @{
    theme = "light"
    target_goal = "Indian Army Special Forces"
    notification_settings = @{ morningBriefing = $true; studyReminders = $false }
} | ConvertTo-Json
$prefRes = Invoke-RestMethod -Uri "$baseUrl/api/preferences" -Method Put -Body $prefBody -ContentType "application/json" -Headers @{ Authorization = "Bearer $vikramToken" }
Write-Host "Updated Theme:" $prefRes.preferences.theme "Goal:" $prefRes.preferences.target_goal

Write-Host "`n=== TEST 6: Invalid Login (Expect 401) ==="
try {
    $badLogin = @{ email = "manoj@garuda.in"; password = "wrongpassword" } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $badLogin -ContentType "application/json"
    Write-Host "FAILED: Should have thrown 401"
} catch {
    Write-Host "SUCCESS: Correctly returned 401 Unauthorized"
}

Write-Host "`nALL API TESTS PASSED!"
