class Usuario {
    constructor(nombre, correo, contrasena) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
    }

    static async guardarUsuario(usuario) {
        try {

            console.log("Enviando datos:", JSON.stringify({
                nombre: usuario.nombre,
                correo: usuario.correo,
                contrasena: usuario.contrasena
            }));

            const response = await fetch('http://localhost/bloombeautyy/registro.php', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    contrasena: usuario.contrasena
                })
            });

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const texto = await response.text();
                throw new Error("Respuesta no válida del servidor: " + texto);
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al registrar usuario');
            }

            return data;
        } catch (error) {
            console.error('Error completo:', error);
            throw new Error(`No se pudo completar el registro: ${error.message}`);
        }
    }

    static async validarUsuario(correo, contrasena) {
        try {

            const response = await fetch('http://localhost/Bloom-Beautyy/login.php', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: correo,
                    contrasena: contrasena
                })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Credenciales incorrectas');
            }

            sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
            return data.usuario;
        } catch (error) {
            console.error('Error al validar usuario:', error);
            throw error;
        }
    }
}
