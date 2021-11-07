import type { Context } from "semantic-release";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";

export type MockContext = DeepMockProxy<Context>;

export const createMockContext = (): MockContext => mockDeep<Context>();
