export async function getAllArtists(){
    const response = await fetch('https://handsomely-divine-abstracted-bed.deploy.space/artists/');
    return response.json();    
 }