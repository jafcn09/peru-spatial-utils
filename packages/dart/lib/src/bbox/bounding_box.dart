class BoundingBox {
  final double minX;
  final double minY;
  final double maxX;
  final double maxY;

  const BoundingBox({
    required this.minX,
    required this.minY,
    required this.maxX,
    required this.maxY,
  });

  Map<String, double> toMap() => {
        'minX': minX,
        'minY': minY,
        'maxX': maxX,
        'maxY': maxY,
      };
}

BoundingBox boundingBox(Map<String, dynamic> geojson) {
  var minX = double.infinity;
  var minY = double.infinity;
  var maxX = double.negativeInfinity;
  var maxY = double.negativeInfinity;

  void visitCoord(List<dynamic> coord) {
    final x = (coord[0] as num).toDouble();
    final y = (coord[1] as num).toDouble();
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  void scan(dynamic node) {
    if (node is List) {
      if (node.isNotEmpty && node[0] is num) {
        visitCoord(node);
      } else {
        for (final child in node) {
          scan(child);
        }
      }
    }
  }

  void walk(Map<String, dynamic> obj) {
    final type = obj['type'];
    if (type == 'FeatureCollection') {
      for (final feature in obj['features'] as List<dynamic>) {
        walk(feature as Map<String, dynamic>);
      }
    } else if (type == 'Feature') {
      final geometry = obj['geometry'];
      if (geometry != null) walk(geometry as Map<String, dynamic>);
    } else if (type == 'GeometryCollection') {
      for (final geometry in obj['geometries'] as List<dynamic>) {
        walk(geometry as Map<String, dynamic>);
      }
    } else {
      scan(obj['coordinates']);
    }
  }

  walk(geojson);

  return BoundingBox(minX: minX, minY: minY, maxX: maxX, maxY: maxY);
}
