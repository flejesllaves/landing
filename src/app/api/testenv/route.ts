export async function GET() {
  return Response.json({
    apiKey: process.env.JSONBIN_API_KEY,
    binId: process.env.JSONBIN_MESSAGES_BIN_ID,
    bannerId: process.env.JSONBIN_BANNER_BIN_ID,
    env: process.env
  });
}