import  jwt  from "jsonwebtoken";


export const generarJWT = (uid: string): Promise<string> => {

    return new Promise((resolve, reject) => {
        const payload = { uid };
        console.log('payload',payload)

        jwt.sign(payload, 'Fi3r0@l0om1ed0331106', {
            expiresIn: '4h',
        }, (err: Error | null, token: string | undefined) => {
            if (err) {
                console.log('aqui toy1')  
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                console.log('aqui toy2') 
                    resolve(token);
                }
        });
    });
};
