/* eslint-disable @typescript-eslint/explicit-function-return-type */
export async function getAllArtists () {
  const response = await fetch('https://handsomely-divine-abstracted-bed.deploy.space/artists/')
  return await response.json()
}

export async function getArtist (id: string) {
  const response = await fetch(`https://handsomely-divine-abstracted-bed.deploy.space/artists/${id}`)
  return await response.json()
}
