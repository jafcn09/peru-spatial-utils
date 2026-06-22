import 'dart:convert';

import '../data/hazard_keywords_data.dart';
import '../data/recommendations_data.dart';

class TerritorialData {
  static final Map<String, dynamic> recommendations =
      jsonDecode(recommendationsJson) as Map<String, dynamic>;

  static final Map<String, dynamic> entities =
      recommendations['entities'] as Map<String, dynamic>;

  static final String fallback = recommendations['fallback'] as String;

  static final Map<String, dynamic> hazards =
      jsonDecode(hazardKeywordsJson) as Map<String, dynamic>;

  static final List<dynamic> hazardRules = hazards['rules'] as List<dynamic>;

  static final Map<String, dynamic> categoryFallback =
      hazards['categoryFallback'] as Map<String, dynamic>;

  static final String defaultHazard = hazards['default'] as String;
}
