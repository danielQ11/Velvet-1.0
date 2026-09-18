import bcrypt from 'bcryptjs'

const password = process.argv[2]
if (!password || password.length < 8) {
  console.error('Uso: node scripts/generate-admin-hash.mjs "tu-contraseña-segura" (mínimo 8 caracteres)')
  process.exit(1)
}
const hash = bcrypt.hashSync(password, 12)
// Next.js expande $ en .env: hay que escapar como \$
const escaped = hash.replace(/\$/g, '\\$')
console.log(escaped)
