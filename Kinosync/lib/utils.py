#UTILS

import json
import difflib
import os


def config(var):
    temp = None;
    with open('/Users/elkhantour/Sites/Kinoji/Kinosync/config.json', 'r') as config:
        data = json.load(config)
        temp = data[var]
        config.close()
    return temp


def approximate_string_match(urls, key):
    best_match = None
    best_ratio = 0

    for url in urls:
        url_key = url.split('/')[-1].split('.')[0].replace('_', ' ').title()
        similarity_ratio = difflib.SequenceMatcher(None, url_key, key).ratio()

        if similarity_ratio > best_ratio:
            best_ratio = similarity_ratio
            best_match = url

    return best_match


def clear():
    os.system('clear')


def beautyprint(obj):
    for key in obj.keys():
        print('{:<14} {:<40}'.format(key, obj[key] or ''))

webcolors = [
    {
        "name": "Lavender",
        "hex": "E6E6FA",
        "rgb": {
            "r": 230,
            "g": 230,
            "b": 250
        },
        "family": "Purple"
    },
    {
        "name": "Thistle",
        "hex": "D8BFD8",
        "rgb": {
            "r": 216,
            "g": 191,
            "b": 216
        },
        "family": "Purple"
    },
    {
        "name": "Plum",
        "hex": "DDA0DD",
        "rgb": {
            "r": 221,
            "g": 160,
            "b": 221
        },
        "family": "Purple"
    },
    {
        "name": "Violet",
        "hex": "EE82EE",
        "rgb": {
            "r": 238,
            "g": 130,
            "b": 238
        },
        "family": "Purple"
    },
    {
        "name": "Orchid",
        "hex": "DA70D6",
        "rgb": {
            "r": 218,
            "g": 112,
            "b": 214
        },
        "family": "Purple"
    },
    {
        "name": "Fuchsia",
        "hex": "FF00FF",
        "rgb": {
            "r": 255,
            "g": 0,
            "b": 255
        },
        "family": "Purple"
    },
    {
        "name": "Magenta",
        "hex": "FF00FF",
        "rgb": {
            "r": 255,
            "g": 0,
            "b": 255
        },
        "family": "Purple"
    },
    {
        "name": "MediumOrchid",
        "hex": "BA55D3",
        "rgb": {
            "r": 186,
            "g": 85,
            "b": 211
        },
        "family": "Purple"
    },
    {
        "name": "MediumPurple",
        "hex": "9370DB",
        "rgb": {
            "r": 147,
            "g": 112,
            "b": 219
        },
        "family": "Purple"
    },
    {
        "name": "BlueViolet",
        "hex": "8A2BE2",
        "rgb": {
            "r": 138,
            "g": 43,
            "b": 226
        },
        "family": "Purple"
    },
    {
        "name": "DarkViolet",
        "hex": "9400D3",
        "rgb": {
            "r": 148,
            "g": 0,
            "b": 211
        },
        "family": "Purple"
    },
    {
        "name": "DarkOrchid",
        "hex": "9932CC",
        "rgb": {
            "r": 153,
            "g": 50,
            "b": 204
        },
        "family": "Purple"
    },
    {
        "name": "DarkMagenta",
        "hex": "8B008B",
        "rgb": {
            "r": 139,
            "g": 0,
            "b": 139
        },
        "family": "Purple"
    },
    {
        "name": "Purple",
        "hex": "800080",
        "rgb": {
            "r": 128,
            "g": 0,
            "b": 128
        },
        "family": "Purple"
    },
    {
        "name": "Indigo",
        "hex": "4B0082",
        "rgb": {
            "r": 75,
            "g": 0,
            "b": 130
        },
        "family": "Purple"
    },
    {
        "name": "DarkSlateBlue",
        "hex": "483D8B",
        "rgb": {
            "r": 72,
            "g": 61,
            "b": 139
        },
        "family": "Purple"
    },
    {
        "name": "SlateBlue",
        "hex": "6A5ACD",
        "rgb": {
            "r": 106,
            "g": 90,
            "b": 205
        },
        "family": "Purple"
    },
    {
        "name": "MediumSlateBlue",
        "hex": "7B68EE",
        "rgb": {
            "r": 123,
            "g": 104,
            "b": 238
        },
        "family": "Purple"
    },
    {
        "name": "Pink",
        "hex": "FFC0CB",
        "rgb": {
            "r": 255,
            "g": 192,
            "b": 203
        },
        "family": "Pink"
    },
    {
        "name": "LightPink",
        "hex": "FFB6C1",
        "rgb": {
            "r": 255,
            "g": 182,
            "b": 193
        },
        "family": "Pink"
    },
    {
        "name": "HotPink",
        "hex": "FF69B4",
        "rgb": {
            "r": 255,
            "g": 105,
            "b": 180
        },
        "family": "Pink"
    },
    {
        "name": "DeepPink",
        "hex": "FF1493",
        "rgb": {
            "r": 255,
            "g": 20,
            "b": 147
        },
        "family": "Pink"
    },
    {
        "name": "PaleVioletRed",
        "hex": "DB7093",
        "rgb": {
            "r": 219,
            "g": 112,
            "b": 147
        },
        "family": "Pink"
    },
    {
        "name": "MediumVioletRed",
        "hex": "C71585",
        "rgb": {
            "r": 199,
            "g": 21,
            "b": 133
        },
        "family": "Pink"
    },
    {
        "name": "LightSalmon",
        "hex": "FFA07A",
        "rgb": {
            "r": 255,
            "g": 160,
            "b": 122
        },
        "family": "Red"
    },
    {
        "name": "Salmon",
        "hex": "FA8072",
        "rgb": {
            "r": 250,
            "g": 128,
            "b": 114
        },
        "family": "Red"
    },
    {
        "name": "DarkSalmon",
        "hex": "E9967A",
        "rgb": {
            "r": 233,
            "g": 150,
            "b": 122
        },
        "family": "Red"
    },
    {
        "name": "LightCoral",
        "hex": "F08080",
        "rgb": {
            "r": 240,
            "g": 128,
            "b": 128
        },
        "family": "Red"
    },
    {
        "name": "IndianRed",
        "hex": "CD5C5C",
        "rgb": {
            "r": 205,
            "g": 92,
            "b": 92
        },
        "family": "Red"
    },
    {
        "name": "Crimson",
        "hex": "DC143C",
        "rgb": {
            "r": 220,
            "g": 20,
            "b": 60
        },
        "family": "Red"
    },
    {
        "name": "FireBrick",
        "hex": "B22222",
        "rgb": {
            "r": 178,
            "g": 34,
            "b": 34
        },
        "family": "Red"
    },
    {
        "name": "DarkRed",
        "hex": "8B0000",
        "rgb": {
            "r": 139,
            "g": 0,
            "b": 0
        },
        "family": "Red"
    },
    {
        "name": "Red",
        "hex": "FF0000",
        "rgb": {
            "r": 255,
            "g": 0,
            "b": 0
        },
        "family": "Red"
    },
    {
        "name": "OrangeRed",
        "hex": "FF4500",
        "rgb": {
            "r": 255,
            "g": 69,
            "b": 0
        },
        "family": "Orange"
    },
    {
        "name": "Tomato",
        "hex": "FF6347",
        "rgb": {
            "r": 255,
            "g": 99,
            "b": 71
        },
        "family": "Orange"
    },
    {
        "name": "Coral",
        "hex": "FF7F50",
        "rgb": {
            "r": 255,
            "g": 127,
            "b": 80
        },
        "family": "Orange"
    },
    {
        "name": "DarkOrange",
        "hex": "FF8C00",
        "rgb": {
            "r": 255,
            "g": 140,
            "b": 0
        },
        "family": "Orange"
    },
    {
        "name": "Orange",
        "hex": "FFA500",
        "rgb": {
            "r": 255,
            "g": 165,
            "b": 0
        },
        "family": "Orange"
    },
    {
        "name": "Yellow",
        "hex": "FFFF00",
        "rgb": {
            "r": 255,
            "g": 255,
            "b": 0
        },
        "family": "Yellow"
    },
    {
        "name": "LightYellow",
        "hex": "FFFFE0",
        "rgb": {
            "r": 255,
            "g": 255,
            "b": 224
        },
        "family": "Yellow"
    },
    {
        "name": "LemonChiffon",
        "hex": "FFFACD",
        "rgb": {
            "r": 255,
            "g": 250,
            "b": 205
        },
        "family": "Yellow"
    },
    {
        "name": "LightGoldenrodYellow",
        "hex": "FAFAD2",
        "rgb": {
            "r": 250,
            "g": 250,
            "b": 210
        },
        "family": "Yellow"
    },
    {
        "name": "PapayaWhip",
        "hex": "FFEFD5",
        "rgb": {
            "r": 255,
            "g": 239,
            "b": 213
        },
        "family": "Yellow"
    },
    {
        "name": "Moccasin",
        "hex": "FFE4B5",
        "rgb": {
            "r": 255,
            "g": 228,
            "b": 181
        },
        "family": "Yellow"
    },
    {
        "name": "PeachPuff",
        "hex": "FFDAB9",
        "rgb": {
            "r": 255,
            "g": 218,
            "b": 185
        },
        "family": "Yellow"
    },
    {
        "name": "PaleGoldenrod",
        "hex": "EEE8AA",
        "rgb": {
            "r": 238,
            "g": 232,
            "b": 170
        },
        "family": "Yellow"
    },
    {
        "name": "Khaki",
        "hex": "F0E68C",
        "rgb": {
            "r": 240,
            "g": 230,
            "b": 140
        },
        "family": "Yellow"
    },
    {
        "name": "DarkKhaki",
        "hex": "BDB76B",
        "rgb": {
            "r": 189,
            "g": 183,
            "b": 107
        },
        "family": "Yellow"
    },
    {
        "name": "Gold",
        "hex": "FFD700",
        "rgb": {
            "r": 255,
            "g": 215,
            "b": 0
        },
        "family": "Yellow"
    },
    {
        "name": "Cornsilk",
        "hex": "FFF8DC",
        "rgb": {
            "r": 255,
            "g": 248,
            "b": 220
        },
        "family": "Brown"
    },
    {
        "name": "BlanchedAlmond",
        "hex": "FFEBCD",
        "rgb": {
            "r": 255,
            "g": 235,
            "b": 205
        },
        "family": "Brown"
    },
    {
        "name": "Bisque",
        "hex": "FFE4C4",
        "rgb": {
            "r": 255,
            "g": 228,
            "b": 196
        },
        "family": "Brown"
    },
    {
        "name": "NavajoWhite",
        "hex": "FFDEAD",
        "rgb": {
            "r": 255,
            "g": 222,
            "b": 173
        },
        "family": "Brown"
    },
    {
        "name": "Wheat",
        "hex": "F5DEB3",
        "rgb": {
            "r": 245,
            "g": 222,
            "b": 179
        },
        "family": "Brown"
    },
    {
        "name": "BurlyWood",
        "hex": "DEB887",
        "rgb": {
            "r": 222,
            "g": 184,
            "b": 135
        },
        "family": "Brown"
    },
    {
        "name": "Tan",
        "hex": "D2B48C",
        "rgb": {
            "r": 210,
            "g": 180,
            "b": 140
        },
        "family": "Brown"
    },
    {
        "name": "RosyBrown",
        "hex": "BC8F8F",
        "rgb": {
            "r": 188,
            "g": 143,
            "b": 143
        },
        "family": "Brown"
    },
    {
        "name": "SandyBrown",
        "hex": "F4A460",
        "rgb": {
            "r": 244,
            "g": 164,
            "b": 96
        },
        "family": "Brown"
    },
    {
        "name": "Goldenrod",
        "hex": "DAA520",
        "rgb": {
            "r": 218,
            "g": 165,
            "b": 32
        },
        "family": "Brown"
    },
    {
        "name": "DarkGoldenrod",
        "hex": "B8860B",
        "rgb": {
            "r": 184,
            "g": 134,
            "b": 11
        },
        "family": "Brown"
    },
    {
        "name": "Peru",
        "hex": "CD853F",
        "rgb": {
            "r": 205,
            "g": 133,
            "b": 63
        },
        "family": "Brown"
    },
    {
        "name": "Chocolate",
        "hex": "D2691E",
        "rgb": {
            "r": 210,
            "g": 105,
            "b": 30
        },
        "family": "Brown"
    },
    {
        "name": "SaddleBrown",
        "hex": "8B4513",
        "rgb": {
            "r": 139,
            "g": 69,
            "b": 19
        },
        "family": "Brown"
    },
    {
        "name": "Sienna",
        "hex": "A0522D",
        "rgb": {
            "r": 160,
            "g": 82,
            "b": 45
        },
        "family": "Brown"
    },
    {
        "name": "Brown",
        "hex": "A52A2A",
        "rgb": {
            "r": 165,
            "g": 42,
            "b": 42
        },
        "family": "Brown"
    },
    {
        "name": "Maroon",
        "hex": "800000",
        "rgb": {
            "r": 128,
            "g": 0,
            "b": 0
        },
        "family": "Brown"
    },
    {
        "name": "DarkOliveGreen",
        "hex": "556B2F",
        "rgb": {
            "r": 85,
            "g": 107,
            "b": 47
        },
        "family": "Green"
    },
    {
        "name": "Olive",
        "hex": "808000",
        "rgb": {
            "r": 128,
            "g": 128,
            "b": 0
        },
        "family": "Green"
    },
    {
        "name": "OliveDrab",
        "hex": "6B8E23",
        "rgb": {
            "r": 107,
            "g": 142,
            "b": 35
        },
        "family": "Green"
    },
    {
        "name": "YellowGreen",
        "hex": "9ACD32",
        "rgb": {
            "r": 154,
            "g": 205,
            "b": 50
        },
        "family": "Green"
    },
    {
        "name": "LimeGreen",
        "hex": "32CD32",
        "rgb": {
            "r": 50,
            "g": 205,
            "b": 50
        },
        "family": "Green"
    },
    {
        "name": "Lime",
        "hex": "00FF00",
        "rgb": {
            "r": 0,
            "g": 255,
            "b": 0
        },
        "family": "Green"
    },
    {
        "name": "LawnGreen",
        "hex": "7CFC00",
        "rgb": {
            "r": 124,
            "g": 252,
            "b": 0
        },
        "family": "Green"
    },
    {
        "name": "Chartreuse",
        "hex": "7FFF00",
        "rgb": {
            "r": 127,
            "g": 255,
            "b": 0
        },
        "family": "Green"
    },
    {
        "name": "GreenYellow",
        "hex": "ADFF2F",
        "rgb": {
            "r": 173,
            "g": 255,
            "b": 47
        },
        "family": "Green"
    },
    {
        "name": "SpringGreen",
        "hex": "00FF7F",
        "rgb": {
            "r": 0,
            "g": 255,
            "b": 127
        },
        "family": "Green"
    },
    {
        "name": "MediumSpringGreen",
        "hex": "00FA9A",
        "rgb": {
            "r": 0,
            "g": 250,
            "b": 154
        },
        "family": "Green"
    },
    {
        "name": "LightGreen",
        "hex": "90EE90",
        "rgb": {
            "r": 144,
            "g": 238,
            "b": 144
        },
        "family": "Green"
    },
    {
        "name": "PaleGreen",
        "hex": "98FB98",
        "rgb": {
            "r": 152,
            "g": 251,
            "b": 152
        },
        "family": "Green"
    },
    {
        "name": "DarkSeaGreen",
        "hex": "8FBC8F",
        "rgb": {
            "r": 143,
            "g": 188,
            "b": 143
        },
        "family": "Green"
    },
    {
        "name": "MediumSeaGreen",
        "hex": "3CB371",
        "rgb": {
            "r": 60,
            "g": 179,
            "b": 113
        },
        "family": "Green"
    },
    {
        "name": "SeaGreen",
        "hex": "2E8B57",
        "rgb": {
            "r": 46,
            "g": 139,
            "b": 87
        },
        "family": "Green"
    },
    {
        "name": "ForestGreen",
        "hex": "228B22",
        "rgb": {
            "r": 34,
            "g": 139,
            "b": 34
        },
        "family": "Green"
    },
    {
        "name": "Green",
        "hex": "008000",
        "rgb": {
            "r": 0,
            "g": 128,
            "b": 0
        },
        "family": "Green"
    },
    {
        "name": "DarkGreen",
        "hex": "006400",
        "rgb": {
            "r": 0,
            "g": 100,
            "b": 0
        },
        "family": "Green"
    },
    {
        "name": "MediumAquamarine",
        "hex": "66CDAA",
        "rgb": {
            "r": 102,
            "g": 205,
            "b": 170
        },
        "family": "Green"
    },
    {
        "name": "Aqua",
        "hex": "00FFFF",
        "rgb": {
            "r": 0,
            "g": 255,
            "b": 255
        },
        "family": "Cyan"
    },
    {
        "name": "Cyan",
        "hex": "00FFFF",
        "rgb": {
            "r": 0,
            "g": 255,
            "b": 255
        },
        "family": "Cyan"
    },
    {
        "name": "LightCyan",
        "hex": "E0FFFF",
        "rgb": {
            "r": 224,
            "g": 255,
            "b": 255
        },
        "family": "Cyan"
    },
    {
        "name": "PaleTurquoise",
        "hex": "AFEEEE",
        "rgb": {
            "r": 175,
            "g": 238,
            "b": 238
        },
        "family": "Cyan"
    },
    {
        "name": "Aquamarine",
        "hex": "7FFFD4",
        "rgb": {
            "r": 127,
            "g": 255,
            "b": 212
        },
        "family": "Cyan"
    },
    {
        "name": "Turquoise",
        "hex": "40E0D0",
        "rgb": {
            "r": 64,
            "g": 224,
            "b": 208
        },
        "family": "Cyan"
    },
    {
        "name": "MediumTurquoise",
        "hex": "48D1CC",
        "rgb": {
            "r": 72,
            "g": 209,
            "b": 204
        },
        "family": "Cyan"
    },
    {
        "name": "DarkTurquoise",
        "hex": "00CED1",
        "rgb": {
            "r": 0,
            "g": 206,
            "b": 209
        },
        "family": "Cyan"
    },
    {
        "name": "LightSeaGreen",
        "hex": "20B2AA",
        "rgb": {
            "r": 32,
            "g": 178,
            "b": 170
        },
        "family": "Cyan"
    },
    {
        "name": "CadetBlue",
        "hex": "5F9EA0",
        "rgb": {
            "r": 95,
            "g": 158,
            "b": 160
        },
        "family": "Cyan"
    },
    {
        "name": "DarkCyan",
        "hex": "008B8B",
        "rgb": {
            "r": 0,
            "g": 139,
            "b": 139
        },
        "family": "Cyan"
    },
    {
        "name": "Teal",
        "hex": "008080",
        "rgb": {
            "r": 0,
            "g": 128,
            "b": 128
        },
        "family": "Cyan"
    },
    {
        "name": "LightSteelBlue",
        "hex": "B0C4DE",
        "rgb": {
            "r": 176,
            "g": 196,
            "b": 222
        },
        "family": "Blue"
    },
    {
        "name": "PowderBlue",
        "hex": "B0E0E6",
        "rgb": {
            "r": 176,
            "g": 224,
            "b": 230
        },
        "family": "Blue"
    },
    {
        "name": "LightBlue",
        "hex": "ADD8E6",
        "rgb": {
            "r": 173,
            "g": 216,
            "b": 230
        },
        "family": "Blue"
    },
    {
        "name": "SkyBlue",
        "hex": "87CEEB",
        "rgb": {
            "r": 135,
            "g": 206,
            "b": 235
        },
        "family": "Blue"
    },
    {
        "name": "LightSkyBlue",
        "hex": "87CEFA",
        "rgb": {
            "r": 135,
            "g": 206,
            "b": 250
        },
        "family": "Blue"
    },
    {
        "name": "DeepSkyBlue",
        "hex": "00BFFF",
        "rgb": {
            "r": 0,
            "g": 191,
            "b": 255
        },
        "family": "Blue"
    },
    {
        "name": "DodgerBlue",
        "hex": "1E90FF",
        "rgb": {
            "r": 30,
            "g": 144,
            "b": 255
        },
        "family": "Blue"
    },
    {
        "name": "CornflowerBlue",
        "hex": "6495ED",
        "rgb": {
            "r": 100,
            "g": 149,
            "b": 237
        },
        "family": "Blue"
    },
    {
        "name": "SteelBlue",
        "hex": "4682B4",
        "rgb": {
            "r": 70,
            "g": 130,
            "b": 180
        },
        "family": "Blue"
    },
    {
        "name": "RoyalBlue",
        "hex": "4169E1",
        "rgb": {
            "r": 65,
            "g": 105,
            "b": 225
        },
        "family": "Blue"
    },
    {
        "name": "Blue",
        "hex": "0000FF",
        "rgb": {
            "r": 0,
            "g": 0,
            "b": 255
        },
        "family": "Blue"
    },
    {
        "name": "MediumBlue",
        "hex": "0000CD",
        "rgb": {
            "r": 0,
            "g": 0,
            "b": 205
        },
        "family": "Blue"
    },
    {
        "name": "DarkBlue",
        "hex": "00008B",
        "rgb": {
            "r": 0,
            "g": 0,
            "b": 139
        },
        "family": "Blue"
    },
    {
        "name": "Navy",
        "hex": "000080",
        "rgb": {
            "r": 0,
            "g": 0,
            "b": 128
        },
        "family": "Blue"
    },
    {
        "name": "MidnightBlue",
        "hex": "191970",
        "rgb": {
            "r": 25,
            "g": 25,
            "b": 112
        },
        "family": "Blue"
    },
    {
        "name": "White",
        "hex": "FFFFFF",
        "rgb": {
            "r": 255,
            "g": 255,
            "b": 255
        },
        "family": "White"
    },
    {
        "name": "Snow",
        "hex": "FFFAFA",
        "rgb": {
            "r": 255,
            "g": 250,
            "b": 250
        },
        "family": "White"
    },
    {
        "name": "Honeydew",
        "hex": "F0FFF0",
        "rgb": {
            "r": 240,
            "g": 255,
            "b": 240
        },
        "family": "White"
    },
    {
        "name": "MintCream",
        "hex": "F5FFFA",
        "rgb": {
            "r": 245,
            "g": 255,
            "b": 250
        },
        "family": "White"
    },
    {
        "name": "Azure",
        "hex": "F0FFFF",
        "rgb": {
            "r": 240,
            "g": 255,
            "b": 255
        },
        "family": "White"
    },
    {
        "name": "AliceBlue",
        "hex": "F0F8FF",
        "rgb": {
            "r": 240,
            "g": 248,
            "b": 255
        },
        "family": "White"
    },
    {
        "name": "GhostWhite",
        "hex": "F8F8FF",
        "rgb": {
            "r": 248,
            "g": 248,
            "b": 255
        },
        "family": "White"
    },
    {
        "name": "WhiteSmoke",
        "hex": "F5F5F5",
        "rgb": {
            "r": 245,
            "g": 245,
            "b": 245
        },
        "family": "White"
    },
    {
        "name": "Seashell",
        "hex": "FFF5EE",
        "rgb": {
            "r": 255,
            "g": 245,
            "b": 238
        },
        "family": "White"
    },
    {
        "name": "Beige",
        "hex": "F5F5DC",
        "rgb": {
            "r": 245,
            "g": 245,
            "b": 220
        },
        "family": "White"
    },
    {
        "name": "OldLace",
        "hex": "FDF5E6",
        "rgb": {
            "r": 253,
            "g": 245,
            "b": 230
        },
        "family": "White"
    },
    {
        "name": "FloralWhite",
        "hex": "FFFAF0",
        "rgb": {
            "r": 255,
            "g": 250,
            "b": 240
        },
        "family": "White"
    },
    {
        "name": "Ivory",
        "hex": "FFFFF0",
        "rgb": {
            "r": 255,
            "g": 255,
            "b": 240
        },
        "family": "White"
    },
    {
        "name": "AntiqueWhite",
        "hex": "FAEBD7",
        "rgb": {
            "r": 250,
            "g": 235,
            "b": 215
        },
        "family": "White"
    },
    {
        "name": "Linen",
        "hex": "FAF0E6",
        "rgb": {
            "r": 250,
            "g": 240,
            "b": 230
        },
        "family": "White"
    },
    {
        "name": "LavenderBlush",
        "hex": "FFF0F5",
        "rgb": {
            "r": 255,
            "g": 240,
            "b": 245
        },
        "family": "White"
    },
    {
        "name": "MistyRose",
        "hex": "FFE4E1",
        "rgb": {
            "r": 255,
            "g": 228,
            "b": 225
        },
        "family": "White"
    },
    {
        "name": "Gainsboro",
        "hex": "DCDCDC",
        "rgb": {
            "r": 220,
            "g": 220,
            "b": 220
        },
        "family": "Black"
    },
    {
        "name": "LightGray",
        "hex": "D3D3D3",
        "rgb": {
            "r": 211,
            "g": 211,
            "b": 211
        },
        "family": "Black"
    },
    {
        "name": "Silver",
        "hex": "C0C0C0",
        "rgb": {
            "r": 192,
            "g": 192,
            "b": 192
        },
        "family": "Black"
    },
    {
        "name": "DarkGray",
        "hex": "A9A9A9",
        "rgb": {
            "r": 169,
            "g": 169,
            "b": 169
        },
        "family": "Black"
    },
    {
        "name": "Gray",
        "hex": "808080",
        "rgb": {
            "r": 128,
            "g": 128,
            "b": 128
        },
        "family": "Black"
    },
    {
        "name": "DimGray",
        "hex": "696969",
        "rgb": {
            "r": 105,
            "g": 105,
            "b": 105
        },
        "family": "Black"
    },
    {
        "name": "LightSlateGray",
        "hex": "778899",
        "rgb": {
            "r": 119,
            "g": 136,
            "b": 153
        },
        "family": "Black"
    },
    {
        "name": "SlateGray",
        "hex": "708090",
        "rgb": {
            "r": 112,
            "g": 128,
            "b": 144
        },
        "family": "Black"
    },
    {
        "name": "DarkSlateGray",
        "hex": "2F4F4F",
        "rgb": {
            "r": 47,
            "g": 79,
            "b": 79
        },
        "family": "Black"
    },
    {
        "name": "Black",
        "hex": "000000",
        "rgb": {
            "r": 0,
            "g": 0,
            "b": 0
        },
        "family": "Black"
    }
]