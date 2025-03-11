import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 기존 사용자 삭제
  await prisma.user.deleteMany()

  // 관리자 계정 생성
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
      role: 'admin',
    },
  })

  // 일반 사용자 계정 생성
  const userPassword = await bcrypt.hash('user123', 10)
  await prisma.user.create({
    data: {
      username: 'user',
      password: userPassword,
      role: 'user',
    },
  })

  console.log('데이터베이스 시드가 완료되었습니다.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 