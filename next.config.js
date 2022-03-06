/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  //distDir: "",
  generateBuildId: async () => {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var N = 16
    const b_id = Array.from(Array(N)).map(() => S[Math.floor(Math.random() * S.length)]).join('')
    console.log("BUILD ID :", b_id)
    return b_id
  },
}
