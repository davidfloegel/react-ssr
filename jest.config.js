module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^app(.*)$': '<rootDir>/src/app$1',
    '^pages(.*)$': '<rootDir>/src/app/pages$1',
    '^components(.*)$': '<rootDir>/src/app/components$1',
    '^lib(.*)$': '<rootDir>/src/app/lib$1',
    '^typings(.*)$': '<rootDir>/src/app/typings$1',
    '^utils(.*)$': '<rootDir>/src/app/utils$1',
    '^uikit(.*)$': '<rootDir>/src/app/uikit$1',
  },
};
