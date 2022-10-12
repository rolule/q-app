import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

// extend vitest matchers with jest-dom matchers
// see https://testing-library.com/docs/ecosystem-jest-dom/
expect.extend(matchers)
