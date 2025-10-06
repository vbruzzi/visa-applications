import { getSchema } from "./actions/schema";
import PublicForm from "./public-form";

export default async function Home() {
  const formSchema = await getSchema();

  return <PublicForm formSchema={formSchema} />;
}
