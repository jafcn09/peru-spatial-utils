import 'to_hectares.dart';

String _formatNumber(double value) {
  final fixed = value.toStringAsFixed(2);
  final parts = fixed.split('.');
  var intPart = parts[0];
  final decPart = parts[1];

  final negative = intPart.startsWith('-');
  if (negative) intPart = intPart.substring(1);

  final buffer = StringBuffer();
  for (var i = 0; i < intPart.length; i++) {
    if (i > 0 && (intPart.length - i) % 3 == 0) buffer.write(',');
    buffer.write(intPart[i]);
  }

  return '${negative ? '-' : ''}${buffer.toString()}.$decPart';
}

String formatArea(double m2) {
  final m2Str = _formatNumber(m2);
  final haStr = _formatNumber(toHectares(m2));
  return '$m2Str m² ($haStr ha)';
}
