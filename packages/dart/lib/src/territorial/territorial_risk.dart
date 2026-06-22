class TerritorialRisk {
  final String risk;
  final int score;

  const TerritorialRisk({required this.risk, required this.score});

  Map<String, dynamic> toMap() => {'risk': risk, 'score': score};
}
