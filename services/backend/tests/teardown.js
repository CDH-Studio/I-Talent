afterAll(() => {
  global.prisma.$disconnect();
});
