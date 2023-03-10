import { describe, expect, it } from "vitest";

import { getMatchedContent } from "../src/client/utils/matchContent";

describe("matchContent", () => {
  it("Should match content", () => {
    expect(getMatchedContent("a b c d", "a")).toEqual([
      ["strong", "a"],
      " b c d",
    ]);
    expect(getMatchedContent("a b c d", "b")).toEqual([
      "a ",
      ["strong", "b"],
      " c d",
    ]);
    expect(getMatchedContent("apple banana cherry", "banana")).toEqual([
      "apple ",
      ["strong", "banana"],
      " cherry",
    ]);
  });

  it("Should return null if no content is matched", () => {
    expect(getMatchedContent("b c d", "a")).toEqual(null);
  });

  it("Should match content multiple times", () => {
    expect(getMatchedContent("a b c d c b a", "b")).toEqual([
      "a ",
      ["strong", "b"],
      " c d c ",
      ["strong", "b"],
      " a",
    ]);
  });

  it("Should cut of long content", () => {
    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "apple"
      )
    ).toEqual([
      "The ",
      ["strong", "apple"],
      " is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeâ€¦ ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "is"
      )
    ).toEqual([
      "The apple ",
      ["strong", "is"],
      " red, and it's veeee â€¦ licious. The banana ",
      ["strong", "is"],
      " yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeâ€¦ ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "The"
      )
    ).toEqual([
      ["strong", "The"],
      " apple is red, and i â€¦ eeeeeery delicious. ",
      ["strong", "The"],
      " banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeâ€¦ ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "delicious"
      )
    ).toEqual([
      "â€¦ eeeeeeeeeeeeeeeeery ",
      ["strong", "delicious"],
      ". The banana is yell â€¦ eeeeeeeeeeeeeeeeery ",
      ["strong", "delicious"],
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "T"
      )
    ).toEqual([
      ["strong", "T"],
      "he apple is red, and â€¦  apple is red, and i",
      ["strong", "T"],
      "'s veeeeeeeeeeeeeeee â€¦ eeeeeery delicious. ",
      ["strong", "T"],
      "he banana is yellow, â€¦ ana is yellow, and i",
      ["strong", "T"],
      " â€¦",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "h"
      )
    ).toEqual([
      "T",
      ["strong", "h"],
      "e apple is red, and  â€¦ eeeeery delicious. T",
      ["strong", "h"],
      "e banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeâ€¦ ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "Th"
      )
    ).toEqual([
      ["strong", "Th"],
      "e apple is red, and  â€¦ eeeeeery delicious. ",
      ["strong", "Th"],
      "e banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeâ€¦ ",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "e"
      )
    ).toEqual([
      "Th",
      ["strong", "e"],
      " appl",
      ["strong", "e"],
      " is r",
      ["strong", "e"],
      "d, and it's v",
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      ["strong", "e"],
      " â€¦",
      ["strong", "e"],
      " â€¦",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "s"
      )
    ).toEqual([
      "The apple i",
      ["strong", "s"],
      " red, and it'",
      ["strong", "s"],
      " veeeeeeeeeeeeeeeeee â€¦ eeeeeeeeery deliciou",
      ["strong", "s"],
      ". The banana i",
      ["strong", "s"],
      " yellow, and it'",
      ["strong", "s"],
      " â€¦",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "u"
      )
    ).toEqual([
      "â€¦ eeeeeeeeeery delicio",
      ["strong", "u"],
      "s. The banana is yel â€¦ eeeeeeeeeery delicio",
      ["strong", "u"],
      "s",
    ]);

    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        "us"
      )
    ).toEqual([
      "â€¦ eeeeeeeeeery delicio",
      ["strong", "us"],
      ". The banana is yell â€¦ eeeeeeeeeery delicio",
      ["strong", "us"],
    ]);
  });
});
