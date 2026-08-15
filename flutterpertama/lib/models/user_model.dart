class UserModel {
  final String id;
  final String name;
  final String role;
  final String nipNik;
  final String? email;
  final String? classId;

  UserModel({
    required this.id,
    required this.name,
    required this.role,
    required this.nipNik,
    this.email,
    this.classId,
  });
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      role: json['role'],
      nipNik: json['nip_nik'],
      email: json['email'],
      classId: json['class_id'],
    );
  }
}
