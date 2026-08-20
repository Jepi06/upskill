// import '../models/student_submission_model.dart';
import 'package:dio/dio.dart';

import '../core/network/api_response.dart';
import '../core/network/dio_client.dart';
import '../models/class_model.dart';

class SchoolRepository {
  final DioClient _client;

  SchoolRepository(this._client);

  Future<ApiResponse<List<ClassModel>>> getClasses() async {
    try {
      final response = await _client.dio.get('/api/classes');

      // Neon Data API mengembalikan array mentah langsung,
      // bukan { success, data }, jadi parsing manual di sini.
      final list = response.data as List<dynamic>;
      final classes = list
          .map((e) => ClassModel.fromJson(e as Map<String, dynamic>))
          .toList();

      return ApiResponse<List<ClassModel>>(success: true, data: classes);
    } on DioException catch (e) {
      return ApiResponse<List<ClassModel>>(
        success: false,
        message: DioClient.getErrorMessage(e),
        error: e.response?.data is Map ? e.response?.data['error'] : null,
      );
    } catch (e) {
      return ApiResponse<List<ClassModel>>(
        success: false,
        message: 'Terjadi kesalahan: ${e.toString()}',
      );
    }
  }
}
