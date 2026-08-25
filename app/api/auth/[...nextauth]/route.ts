// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth" // ou ajuste o caminho correto para onde salvou o auth.ts

export const { GET, POST } = handlers
