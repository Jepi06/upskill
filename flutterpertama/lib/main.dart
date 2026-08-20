import 'package:flutter/material.dart';
import 'package:flutterpertama/provider/auth_provider.dart';
import 'package:flutterpertama/provider/school_provider.dart';
import 'package:flutterpertama/repositories/auth_repositories.dart';
import 'package:flutterpertama/repositories/school_repositories.dart';
import 'package:flutterpertama/screen/auth/login_screen.dart';
import 'package:flutterpertama/screen/guru/teacher_home_screen.dart';
import 'package:provider/provider.dart';

import 'core/network/dio_client.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  final dioClient = DioClient();
  final authRepo = AuthRepository(dioClient);
  final schoolRepo = SchoolRepository(dioClient);

  runApp(
    MultiProvider(
      providers: [
        Provider.value(value: schoolRepo),
        ChangeNotifierProvider(
          create: (_) => AuthProvider(authRepo)..loadSession(),
        ),
        ChangeNotifierProvider(
          create: (_) => SchoolProvider(schoolRepo)..fetchClasses(),
        ),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aplikasi Pengumpulan Tugas',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: Consumer<AuthProvider>(
        builder: (context, authProvider, _) {
          if (authProvider.isInitializing) {
            return const Scaffold(
              body: Center(child: CircularProgressIndicator()),
            );
          }

          if (!authProvider.isAuthenticated) {
            return const LoginScreen();
          }
          return const TeacherHomeScreen();
        },
      ),
    );
  }
}
