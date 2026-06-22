int riskLevelToScore(String level) {
  switch (level) {
    case 'BAJO':
      return 1;
    case 'MEDIO':
      return 2;
    case 'ALTO':
      return 3;
    default:
      return 0;
  }
}
