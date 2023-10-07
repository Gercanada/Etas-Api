// import Role from '../models/role';
import Usuario from '../models/usuario';
// export const esRoleValido = async (rol: string) => {
//   const existeRol = await Role.findOne({ rol });
//   if (!existeRol) {
//     throw new Error(`El rol ${rol} no está registrado en la BD`);
//   }
// };

export const emailExiste = async (email: string) => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

export const existeUsuarioPorId = async (id: string) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};
