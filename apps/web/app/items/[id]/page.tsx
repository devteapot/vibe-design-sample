import { DetailPage } from "../../../src/workspace";
import { tasks } from "../../../src/fixtures";
export function generateStaticParams() { return tasks.map(({ id }) => ({ id })); }
export default function Page() { return <DetailPage />; }
