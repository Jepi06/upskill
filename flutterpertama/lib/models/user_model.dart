class UserModel {
  final String id;
  final String nama;
  final String role;
  final String nipNik;
  final String? email;
  final String? classId;

  UserModel({
    required this.id,
    required this.nama,
    required this.role,
    required this.nipNik,
    this.email,
    this.classId,
  });
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      nama: json['nama'],
      role: json['role'],
      nipNik: json['nip_nik'],
      email: json['email'],
      classId: json['class_id'],
    );
  }
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nama': nama,
      'role': role,
      'nip_nik': nipNik,
      'email': email,
      'class_id': classId,
    };
  }
}
