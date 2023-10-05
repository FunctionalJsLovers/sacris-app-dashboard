/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getAllArtists () {
  const response = await fetch('https://handsomely-divine-abstracted-bed.deploy.space/artists/')
  return await response.json()
}
