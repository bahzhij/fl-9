function reverseNumber(number) {
  let reversedVersion =
    parseInt(
      number
        .toString()
        .split('')
        .reverse()
        .join('')
    ) * Math.sign(number);

  return reversedVersion;
}