#pragma once

#include "fonts/textSm.h"
#include "fonts/textMd.h"
#include "fonts/textLg.h"
#include "fonts/textXl.h"

#include "fonts/moon24.h"

#include "fonts/meteocons42.h"
#include "fonts/meteocons96.h"

GFXfont getFontByName(String fontName)
{
    if (fontName == "t-sm")
        return textSm;
    if (fontName == "t-md")
        return textMd;
    if (fontName == "t-lg")
        return textLg;
    if (fontName == "t-xl")
        return textXl;

    if (fontName == "moon")
        return moon24;

    if (fontName == "meteo-md")
        return meteocons42;
    if (fontName == "meteo-xl")
        return meteocons96;

    return textSm;
}