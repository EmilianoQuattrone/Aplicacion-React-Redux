
export const startUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dxfa0weca/upload';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'journal-app');

    try {

        const respuesta = await fetch(cloudUrl, {

            method: 'POST',
            body: formData
        });

        if (respuesta.ok) {

            const respuestaClod = await respuesta.json();
            return respuestaClod.secure_url;
        } else {

            throw await respuesta.json();
        }

    } catch (error) {

        throw error;
    }
}