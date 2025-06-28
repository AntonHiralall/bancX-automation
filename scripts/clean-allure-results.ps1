# Allure Results Cleanup Script
# This script cleans up Allure results and reports to ensure only the most recent test runs are displayed

param(
    [switch]$CleanReports = $true,
    [switch]$CleanResults = $true,
    [switch]$Verbose = $false
)

Write-Host "Starting Allure cleanup process..." -ForegroundColor Cyan

# Function to log messages
function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $color = switch ($Level) {
        "ERROR" { "Red" }
        "WARN" { "Yellow" }
        "SUCCESS" { "Green" }
        default { "White" }
    }
    Write-Host "[$timestamp] $Message" -ForegroundColor $color
}

# Function to safely remove directory
function Remove-DirectorySafely {
    param([string]$Path, [string]$Description)
    
    if (Test-Path $Path) {
        try {
            Write-Log "Removing $Description..." -Level "INFO"
            Remove-Item -Path $Path -Recurse -Force
            Write-Log "Successfully removed $Description" -Level "SUCCESS"
        }
        catch {
            $errorMsg = $_.Exception.Message
            Write-Log "Failed to remove $Description - $errorMsg" -Level "ERROR"
            return $false
        }
    } else {
        Write-Log "$Description does not exist, skipping..." -Level "WARN"
    }
    return $true
}

# Function to create directory if it doesn't exist
function Ensure-DirectoryExists {
    param([string]$Path, [string]$Description)
    
    if (-not (Test-Path $Path)) {
        try {
            Write-Log "Creating $Description..." -Level "INFO"
            New-Item -ItemType Directory -Path $Path -Force | Out-Null
            Write-Log "Successfully created $Description" -Level "SUCCESS"
        }
        catch {
            $errorMsg = $_.Exception.Message
            Write-Log "Failed to create $Description - $errorMsg" -Level "ERROR"
            return $false
        }
    } else {
        Write-Log "$Description already exists" -Level "INFO"
    }
    return $true
}

# Main cleanup process
try {
    $scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $projectRoot = Split-Path -Parent $scriptDir
    
    Write-Log "Project root: $projectRoot" -Level "INFO"
    
    # Clean Allure Results
    if ($CleanResults) {
        $allureResultsPath = Join-Path $projectRoot "allure-results"
        $success = Remove-DirectorySafely -Path $allureResultsPath -Description "Allure Results"
        
        if ($success) {
            Ensure-DirectoryExists -Path $allureResultsPath -Description "Allure Results directory"
        }
    }
    
    # Clean Allure Reports
    if ($CleanReports) {
        $allureReportPath = Join-Path $projectRoot "allure-report"
        Remove-DirectorySafely -Path $allureReportPath -Description "Allure Report"
    }
    
    # Clean test-results directory (Playwright default)
    $testResultsPath = Join-Path $projectRoot "test-results"
    if (Test-Path $testResultsPath) {
        Write-Log "Cleaning Playwright test-results..." -Level "INFO"
        Remove-DirectorySafely -Path $testResultsPath -Description "Playwright Test Results"
    }
    
    # Clean playwright-report directory
    $playwrightReportPath = Join-Path $projectRoot "playwright-report"
    if (Test-Path $playwrightReportPath) {
        Write-Log "Cleaning Playwright report..." -Level "INFO"
        Remove-DirectorySafely -Path $playwrightReportPath -Description "Playwright Report"
    }
    
    Write-Log "Allure cleanup completed successfully!" -Level "SUCCESS"
    
    # Display summary
    Write-Host ""
    Write-Host "Cleanup Summary:" -ForegroundColor Cyan
    if ($CleanResults) {
        Write-Host "   - Allure Results: Cleaned" -ForegroundColor White
    } else {
        Write-Host "   - Allure Results: Skipped" -ForegroundColor White
    }
    if ($CleanReports) {
        Write-Host "   - Allure Reports: Cleaned" -ForegroundColor White
    } else {
        Write-Host "   - Allure Reports: Skipped" -ForegroundColor White
    }
    Write-Host "   - Playwright Results: Cleaned" -ForegroundColor White
    Write-Host "   - Playwright Reports: Cleaned" -ForegroundColor White
    
} catch {
    $errorMsg = $_.Exception.Message
    Write-Log "Unexpected error during cleanup - $errorMsg" -Level "ERROR"
    exit 1
}

Write-Host ""
Write-Host "Ready for fresh test runs!" -ForegroundColor Green 