import { mergeTests } from "@playwright/test"
import { fixtures } from "./fixtures"
import { accountFixtures } from "./fixtures/account"

export const test = mergeTests(fixtures, accountFixtures)
export { expect } from "@playwright/test"

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/TitlePage">Go to Title Typing Page</Link>
    </div>
  );
}
