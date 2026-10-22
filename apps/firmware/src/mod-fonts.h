#pragma once

// Nunito Regular; temperature fonts use Semibold digits only.
// Regenerate with fonts/build-fonts.py.
#include "fonts/textSm.h"
#include "fonts/textMd.h"
#include "fonts/textLg.h"
#include "fonts/textXl.h"
#include "fonts/temperatureMd.h"
#include "fonts/temperatureLg.h"
#include "fonts/temperatureXl.h"
#include "fonts/fieldIcons.h"

#include "fonts/moon24.h"

#include "fonts/meteocons42.h"
#include "fonts/meteoconsSmall.h"
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
    if (fontName == "temp-md")
        return temperatureMd;
    if (fontName == "temp-lg")
        return temperatureLg;
    if (fontName == "temp-xl")
        return temperatureXl;
    if (fontName == "field-icons")
        return fieldIcons;

    if (fontName == "moon")
        return moon24;

    if (fontName == "meteo-md")
        return meteocons42;
    if (fontName == "meteo-sm")
        return meteoconsSmall;
    if (fontName == "meteo-xl")
        return meteocons96;

    return textSm;
}
