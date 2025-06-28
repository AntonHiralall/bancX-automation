# bancX Automation Framework

A robust end-to-end testing framework for bancX using Playwright and TypeScript, following the Page Object Model (POM) pattern.

## 🚀 Features

- **Modern Tech Stack**: Built with Playwright + TypeScript
- **Page Object Model**: Clean, maintainable, and scalable test architecture
- **Type Safety**: Full TypeScript support for better development experience
- **CI/CD Ready**: GitHub Actions workflow integration
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **Parallel Execution**: Run tests in parallel for faster execution
- **Detailed Reporting**: HTML and JSON test reports
- **Environment Configuration**: Flexible configuration for different environments

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Allure CLI (install globally: `npm install -g allure-commandline`)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/AntonHiralall/bancX-automation.git
cd bancX-automation
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🏗️ Project Structure

```
bancX-automation/
├── config/                 # Configuration files
├── pages/                  # Page Object Models
│   └── api/               # API service layer
├── tests/                  # Test specifications
│   ├── ui/                # UI/E2E test specifications
│   └── api/               # API test specifications
├── test-data/             # Test data files
├── utils/                 # Helper functions and utilities
├── tests-examples/        # Example test cases
└── playwright.config.ts   # Playwright configuration
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run UI tests only
```bash
npm run test:ui
# or using project configuration
npm run test:ui-project
```

### Run API tests only
```bash
npm run test:api
# or using project configuration
npm run test:api-project
```

### Run combined API + UI tests
```bash
npm run test:combined
```

### Run tests in UI mode
```bash
npm run test:ui-mode
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests with Allure reporting
```bash
npm run test:ui -- --reporter=allure-playwright
```

## 🔌 API Testing Integration

The framework now supports both UI and API testing with seamless integration:

### API Testing Structure

```
pages/
├── api/                    # API Page Objects (Service Layer)
│   └── AuthApi.ts         # Authentication API endpoints
utils/
├── apiHelpers.ts          # Common API utilities and request handling
tests/
├── ui/                    # UI/E2E test specifications
│   ├── login.spec.ts      # Login UI tests
│   ├── dashboard.spec.ts  # Dashboard UI tests
│   └── ...                # Other UI tests
├── api/                   # API test specifications
│   ├── auth.api.spec.ts   # Authentication API tests
│   └── combined.api.spec.ts # Combined API + UI tests
```

### Key Features

- **Unified Framework**: Same Playwright setup for both UI and API tests
- **Page Object Model**: API endpoints organized in service classes
- **Reusable Helpers**: Common API utilities for request/response handling
- **Authentication Management**: Automatic token handling and session management
- **Combined Testing**: API setup for UI tests and vice versa
- **Type Safety**: Full TypeScript support for API contracts

### API Testing Examples

```typescript
// Simple API test
test('Login via API', async ({ request }) => {
    const apiHelpers = new ApiHelpers(request);
    const authApi = new AuthApi(apiHelpers);
    
    const response = await authApi.login({
        email: 'user@example.com',
        password: 'password'
    });
    
    expect(response.token).toBeDefined();
});

// Combined API + UI test
test('API setup for UI verification', async ({ page, request }) => {
    // Setup data via API
    const apiHelpers = new ApiHelpers(request);
    await apiHelpers.post('/api/test-data', { status: 'pending' });
    
    // Verify in UI
    await page.goto('/dashboard');
    await expect(page.locator('.status')).toHaveText('pending');
});
```

### Running API Tests

```bash
# Run all API tests
npm run test:api

# Run specific API test
npx playwright test tests/api/auth.api.spec.ts

# Run combined tests
npm run test:combined
```

## 📊 Test Reports

After test execution, view the HTML report:
```bash
npx playwright show-report
```

### Allure Reports

Allure provides advanced, interactive test reporting. To generate and view Allure reports:

1. **Run your tests:**
   ```bash
   npx playwright test
   ```
2. **Generate the Allure report:**
   ```bash
   npx allure generate allure-results --clean -o allure-report
   ```
3. **Open the Allure report in your browser:**
   ```bash
   npx allure open allure-report
   ```

## 🔧 Configuration

The framework uses `playwright.config.ts` for configuration. Key settings include:
- Browser selection
- Viewport size
- Timeouts
- Retry attempts
- Screenshot and video capture
- Environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Best Practices

- Follow the Page Object Model pattern
- Use meaningful test descriptions
- Keep tests independent
- Use data-driven testing where appropriate
- Implement proper error handling
- Add appropriate waits and assertions

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
BASE_URL=your_base_url
USERNAME=your_username
PASSWORD=your_password
```

## 📚 Documentation

For more detailed documentation, refer to:
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Anton Hiralall** - *Initial work* - [AntonHiralall](https://github.com/AntonHiralall)

## 🧹 Allure Results Cleanup

### Automatic Cleanup Scripts
To ensure only the most recent test runs are displayed in Allure reports, use these cleanup scripts:

```bash
# Clean everything (results + reports)
npm run clean:allure

# Clean only Allure results (keep reports)
npm run clean:allure:results

# Clean only Allure reports (keep results)
npm run clean:allure:reports
```

### Manual Cleanup
You can also run the cleanup script directly:

```bash
# PowerShell script
powershell -ExecutionPolicy Bypass -File scripts/clean-allure-results.ps1

# Windows batch file
scripts/clean-allure.bat
```

### What Gets Cleaned
- `allure-results/` - Previous test results and attachments
- `allure-report/` - Generated Allure reports
- `test-results/` - Playwright test results
- `playwright-report/` - Playwright HTML reports

## 📊 Allure Reporting

### Generate and View Reports
```bash
# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open

# Serve Allure report (live mode)
npm run allure:serve
```

### Report Features
- **Test Results**: Pass/fail status with detailed error messages
- **Screenshots**: Automatic screenshots on test failures
- **Videos**: Test execution recordings
- **Logs**: Console logs and test steps
- **Environment Info**: Browser, OS, and test configuration

## 📁 Project Structure

```
bancx-automation/
├── tests/
│   ├── UI/                 # UI test specifications
│   └── api/               # API test specifications
├── pages/                 # Page Object Models
├── utils/                 # Helper functions and utilities
├── config/               # Configuration files
├── test-data/            # Test data files
├── scripts/              # Utility scripts
│   ├── clean-allure-results.ps1
│   └── clean-allure.bat
├── allure-results/       # Allure test results
├── allure-report/        # Generated Allure reports
└── playwright.config.ts  # Playwright configuration
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
BASE_URL=https://your-application-url.com
API_BASE_URL=https://your-api-url.com
USERNAME=your-username
PASSWORD=your-password
```

### Playwright Configuration
The framework supports multiple browser configurations and environments. See `playwright.config.ts` for details.

## 📝 Best Practices

### Test Organization
- Use descriptive test names
- Group related tests using `test.describe()`
- Follow the AAA pattern (Arrange, Act, Assert)

### Page Object Model
- Each page has its own Page Object class
- Keep selectors private and methods public
- Return new page objects when navigation occurs

### Logging and Debugging
- Use `console.log()` for debugging
- Leverage Allure's built-in logging
- Add descriptive error messages to assertions

## 🐛 Troubleshooting

### Common Issues
1. **Allure Results Not Showing**: Run `npm run clean:allure` to clear old results
2. **Test Failures**: Check browser compatibility and element selectors
3. **Timeout Issues**: Increase timeout values in `playwright.config.ts`

### Debug Mode
```bash
# Run tests in debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui-mode
```

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper logging and error messages
3. Update documentation for new features
4. Run cleanup scripts before committing

## 📄 License

This project is licensed under the ISC License.
