from src.domain.ports.user_repository_port import UserRepositoryPort
from src.domain.entities.user import User

AVATAR_POR_ROL = {'admin': '🌳', 'docente': '🌿', 'estudiante': '🌱'}

class UserUseCase:
    def __init__(self, repository: UserRepositoryPort):
        self.repository = repository

    def login(self, username: str, password: str) -> dict:
        user = self.repository.get_by_username(username)
        if not user:
            return {"error": "Usuario no encontrado"}
        if user.password_hash != password:
            return {"error": "Contraseña incorrecta"}
        return {"user": user.to_dict()}

    def get_all_users(self):
        return [u.to_dict() for u in self.repository.get_all()]

    def create_user(self, nombre: str, username: str, email: str, password: str, rol: str) -> dict:
        existing = self.repository.get_by_username(username)
        if existing:
            return {"error": "El nombre de usuario ya existe"}
        user = User(
            username=username, nombre=nombre, email=email,
            password_hash=password, rol=rol,
            avatar=AVATAR_POR_ROL.get(rol, '🌱'),
        )
        created = self.repository.create(user)
        return {"user": created.to_dict()}

    def update_user(self, user_id: str, data: dict) -> dict:
        update_data = {k: v for k, v in data.items() if v is not None and v != ''}
        if 'password' in update_data:
            update_data['password_hash'] = update_data.pop('password')
        updated = self.repository.update(user_id, update_data)
        if not updated:
            return {"error": "Usuario no encontrado"}
        return {"user": updated.to_dict()}

    def delete_user(self, user_id: str) -> dict:
        success = self.repository.delete(user_id)
        if not success:
            return {"error": "Usuario no encontrado"}
        return {"ok": True}

    def toggle_active(self, user_id: str) -> dict:
        user = self.repository.toggle_active(user_id)
        if not user:
            return {"error": "Usuario no encontrado"}
        return {"user": user.to_dict()}
