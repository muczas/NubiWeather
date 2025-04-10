function sanitizeCityName(city: string): string {
    const polishMap: Record<string, string> = {
      ą: "a",
      ć: "c",
      ę: "e",
      ł: "l",
      ń: "n",
      ó: "o",
      ś: "s",
      ź: "z",
      ż: "z",
      Ą: "A",
      Ć: "C",
      Ę: "E",
      Ł: "L",
      Ń: "N",
      Ó: "O",
      Ś: "S",
      Ź: "Z",
      Ż: "Z",
    };
  
    const replaced = city
      .split("")
      .map((char) => polishMap[char] || char)
      .join("");
  
    return replaced.charAt(0).toUpperCase() + replaced.slice(1).toLowerCase();
  }
  