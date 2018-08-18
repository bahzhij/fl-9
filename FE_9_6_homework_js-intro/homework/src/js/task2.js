let firstSide = parseFloat(
    prompt('Please enter length of the first side of a triangle', '0')
  );
  let secondSide = parseFloat(
    prompt('Please enter length of the second side of a triangle', '0')
  );
  let angle = parseFloat(prompt('Please enter angle between these sides', '0'));
  
  let maxAngle = 180;
  let result;
  
  if (
    isNaN(firstSide) ||
    isNaN(secondSide) ||
    isNaN(angle) ||
    angle > maxAngle ||
    firstSide <= 0 ||
    secondSide <= 0 ||
    angle <= 0
  ) {
    result = 'Invalid data!';
  } else {
    let angleRadian = Math.PI / maxAngle * angle;
    let thirdSide = Math.sqrt(
      Math.pow(firstSide, 2) +
        Math.pow(secondSide, 2) -
        2 * firstSide * secondSide * Math.cos(angleRadian)
    );
    let perimeter = firstSide + secondSide + thirdSide;
    let area = firstSide * secondSide * Math.sin(angleRadian) / 2;
    result = `
      c length: ${+parseInt(thirdSide * 100) / 100}
      Triangle square: ${+parseInt(area * 100) / 100}
      Triangle perimeter: ${+parseInt(perimeter * 100) / 100}`;
  }
  
  console.log(result);
  