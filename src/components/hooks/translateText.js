export const translateText = async (text, sourceLang, targetLang) => {
    if (!text || !sourceLang || !targetLang) {
        console.error('Faltan parámetros para la traducción');
        return text;
    }

    try {
        const response = await fetch('http://localhost/escape-desarrollo-backend/public/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, source_lang: sourceLang, target_lang: targetLang }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        return data.translation || text; 
    } catch (error) {
        console.error('Error al traducir el texto:', error);
        return text;
    }
};
