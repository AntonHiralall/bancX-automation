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
- **Base Page Class**: Common functionality shared across all page objects

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

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
│   ├── BasePage.ts        # Base class with common functionality
│   ├── LoginPage.ts       # Login page implementation
│   └── ...               # Other page objects
├── tests/                  # Test specifications
├── test-data/             # Test data files
├── utils/                 # Helper functions and utilities
├── tests-examples/        # Example test cases
└── playwright.config.ts   # Playwright configuration
```

## 📝 Page Object Model Implementation

### BasePage Class
The `BasePage` class provides common functionality used across all page objects:
- Page navigation
- Page load waiting
- Title retrieval
- Next button interaction
- Element visibility validation

Example usage:
```typescript
class CustomPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    
    // Custom page methods
}
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run specific test file
```bash
npx playwright test tests/documentUploads.spec.ts
```

### Run tests in UI mode
```bash
npx playwright test --ui
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

## 📊 Test Reports

After test execution, view the HTML report:
```bash
npx playwright show-report
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
- Extend BasePage for common functionality
- Use meaningful test descriptions
- Keep tests independent
- Use data-driven testing where appropriate
- Implement proper error handling
- Add appropriate waits and assertions
- Use TypeScript types for better code quality

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

## 🙏 Acknowledgments

- Playwright team for the amazing testing framework
- TypeScript team for the type safety features
- All contributors who have helped shape this project 