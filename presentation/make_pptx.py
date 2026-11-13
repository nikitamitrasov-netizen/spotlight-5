# -*- coding: utf-8 -*-
"""Build a colourful, simple presentation based on the Spotlight 5 paper."""

import os
import re
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LEGEND_POSITION, XL_LABEL_POSITION
from pptx.oxml.ns import qn

BASE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(BASE, "Spotlight5_prezentatsiya.pptx")
SHOT_MAP = os.path.join(BASE, "..", "preview", "02-overview-light.png")
SHOT_READ = os.path.join(BASE, "..", "preview", "04-reading.png")

W, H = 13.333, 7.5
BG = RGBColor(0x0B, 0x10, 0x20)
CARD = RGBColor(0x15, 0x1C, 0x33)
CARD2 = RGBColor(0x1A, 0x23, 0x40)
BORDER = RGBColor(0x2A, 0x35, 0x55)
TEXT = RGBColor(0xF6, 0xF7, 0xFF)
MUTED = RGBColor(0xA9, 0xB2, 0xCA)
DIM = RGBColor(0x70, 0x7B, 0x9A)
CORAL = RGBColor(0xFF, 0x6B, 0x8A)
MINT = RGBColor(0x43, 0xE0, 0xC0)
YELLOW = RGBColor(0xFF, 0xD1, 0x66)
BLUE = RGBColor(0x6C, 0x8C, 0xFF)
LAV = RGBColor(0xB3, 0x88, 0xFF)
ORANGE = RGBColor(0xFF, 0x9F, 0x68)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
FONT = "Arial"

prs = Presentation()
prs.slide_width = Inches(W)
prs.slide_height = Inches(H)
BLANK = prs.slide_layouts[6]


def rgb_hex(c):
    return "%02X%02X%02X" % (c[0], c[1], c[2])


def add_slide():
    return prs.slides.add_slide(BLANK)


def shape(slide, kind, x, y, w, h, fill, line=None, radius=None):
    sh = slide.shapes.add_shape(kind, Inches(x), Inches(y), Inches(w), Inches(h))
    if fill is None:
        sh.fill.background()
    else:
        sh.fill.solid()
        sh.fill.fore_color.rgb = fill
    if line is None:
        sh.line.fill.background()
    else:
        sh.line.color.rgb = line
        sh.line.width = Pt(1)
    sh.shadow.inherit = False
    if radius is not None and kind == MSO_SHAPE.ROUNDED_RECTANGLE:
        try:
            sh.adjustments[0] = radius
        except Exception:
            pass
    return sh


def text(slide, x, y, w, h, value, size=14, color=TEXT, bold=False,
         align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, font=FONT,
         line_spacing=1.0, after=0, margins=(0, 0, 0, 0)):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.vertical_anchor = anchor
    tf.margin_left, tf.margin_right, tf.margin_top, tf.margin_bottom = [Inches(m) for m in margins]
    for idx, line in enumerate(str(value).split("\n")):
        p = tf.paragraphs[0] if idx == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = line_spacing
        p.space_before = Pt(0)
        p.space_after = Pt(after)
        parts = re.split(r"(\*\*.*?\*\*)", line)
        for part in parts:
            if part == "":
                continue
            is_bold = part.startswith("**") and part.endswith("**")
            run = p.add_run()
            run.text = part[2:-2] if is_bold else part
            run.font.name = font
            run.font.size = Pt(size)
            run.font.bold = bold or is_bold
            run.font.color.rgb = color
    return box


def add_notes(slide, value):
    slide.notes_slide.notes_text_frame.text = value


def deco(slide, accent=CORAL):
    shape(slide, MSO_SHAPE.RECTANGLE, 0, 0, W, H, BG)
    shape(slide, MSO_SHAPE.OVAL, 10.4, -2.0, 4.8, 4.8, RGBColor(0x11, 0x18, 0x2B), None)
    shape(slide, MSO_SHAPE.OVAL, -2.2, 5.0, 4.0, 4.0, RGBColor(0x0F, 0x16, 0x28), None)
    shape(slide, MSO_SHAPE.OVAL, 12.55, 0.85, 0.12, 0.12, accent, None)


def footer(slide, num, accent=CORAL):
    shape(slide, MSO_SHAPE.RECTANGLE, 0.75, 7.03, 11.85, 0.012, BORDER, None)
    text(slide, 0.75, 7.10, 6.0, 0.22, "SPOTLIGHT 5  ·  ИНТЕРАКТИВНАЯ ИНТЕЛЛЕКТ-КАРТА", 8, DIM)
    text(slide, 12.15, 7.08, 0.45, 0.22, f"{num:02d}", 9, accent, True, PP_ALIGN.RIGHT)


def base(slide, num, kicker, title, accent=CORAL, title_size=28):
    deco(slide, accent)
    shape(slide, MSO_SHAPE.RECTANGLE, 0.55, 0.42, 0.055, 0.26, accent, None)
    text(slide, 0.75, 0.36, 10.0, 0.26, kicker.upper(), 9.5, accent, True)
    text(slide, 0.75, 0.70, 11.9, 0.90, title, title_size, TEXT, True, line_spacing=1.0)
    footer(slide, num, accent)


def chip(slide, x, y, w, h, value, fill, color=TEXT, size=9, border=None):
    shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h, fill, border, 0.5)
    text(slide, x, y, w, h, value, size, color, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)


def card(slide, x, y, w, h, fill=CARD, border=BORDER, radius=0.09):
    return shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h, fill, border, radius)


def number_badge(slide, x, y, d, value, fill, color=BG, size=12):
    shape(slide, MSO_SHAPE.OVAL, x, y, d, d, fill, None)
    text(slide, x, y, d, d, value, size, color, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)


def connector(slide, x1, y1, x2, y2, color=BORDER, width=1.4):
    line = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    line.line.color.rgb = color
    line.line.width = Pt(width)


def picture_card(slide, path, x, y, w, h):
    card(slide, x - 0.06, y - 0.06, w + 0.12, h + 0.12, CARD2, BORDER, 0.03)
    pic = slide.shapes.add_picture(path, Inches(x), Inches(y), Inches(w), Inches(h))
    try:
        pic.line.color.rgb = BORDER
        pic.line.width = Pt(0.8)
    except Exception:
        pass
    return pic


# =====================================================================
# 01 — TITLE
# =====================================================================
s = add_slide()
deco(s, BLUE)
shape(s, MSO_SHAPE.OVAL, 8.4, 0.35, 5.8, 5.8, RGBColor(0x10, 0x17, 0x2A), None)
shape(s, MSO_SHAPE.OVAL, 9.1, 1.15, 4.4, 4.4, None, RGBColor(0x24, 0x30, 0x52))
shape(s, MSO_SHAPE.OVAL, 10.0, 2.1, 2.9, 2.9, None, RGBColor(0x2C, 0x3A, 0x62))

chip(s, 0.75, 0.75, 3.55, 0.34, "НАУЧНО-ИССЛЕДОВАТЕЛЬСКАЯ РАБОТА", CARD2, MINT, 8)
text(s, 0.75, 1.38, 7.15, 2.55,
     "ИНТЕРАКТИВНАЯ\nИНТЕЛЛЕКТ-КАРТА\nКАК СРЕДСТВО\nСИСТЕМАТИЗАЦИИ",
     30, TEXT, True, line_spacing=0.94)
text(s, 0.75, 3.98, 7.1, 0.55, "иноязычного материала в 5 классе", 16, MUTED)
text(s, 0.75, 4.42, 7.1, 0.35, "на материале УМК «Spotlight 5»", 13, BLUE, True)
text(s, 0.75, 5.25, 7.1, 0.85,
     "Выполнил(а): ______________________\nНаучный руководитель: ______________",
     10.5, MUTED, line_spacing=1.25)
text(s, 0.75, 6.72, 6.0, 0.25, "МБОУ «СОШ № ___»  ·  Ангарск  ·  2026", 9, DIM)

# motif
cx, cy = 10.45, 3.55
for tx, ty, color, label in [
    (7.55, 1.55, MINT, "Vocabulary"),
    (11.35, 1.65, CORAL, "Grammar"),
    (11.35, 4.95, YELLOW, "Speaking"),
    (7.55, 5.05, LAV, "Culture"),
]:
    connector(s, cx, cy, tx + 0.85, ty + 0.27, color, 1.2)
for tx, ty, color, label, w in [
    (7.55, 1.55, MINT, "Vocabulary", 1.7),
    (11.35, 1.65, CORAL, "Grammar", 1.55),
    (11.35, 4.95, YELLOW, "Speaking", 1.55),
    (7.55, 5.05, LAV, "Culture", 1.55),
]:
    shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, tx, ty, w, 0.55, CARD2, color, 0.4)
    text(s, tx, ty, w, 0.55, label, 9.5, color, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)

shape(s, MSO_SHAPE.OVAL, 9.63, 2.75, 1.62, 1.62, BLUE, None)
shape(s, MSO_SHAPE.OVAL, 9.78, 2.90, 1.32, 1.32, BG, None)
text(s, 9.78, 2.98, 1.32, 0.78, "5", 36, WHITE, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)
text(s, 9.78, 3.70, 1.32, 0.18, "SPOTLIGHT", 6.5, MUTED, True, PP_ALIGN.CENTER)
for x, y, c in [(12.0, 2.1, CORAL), (8.5, 2.05, MINT), (8.45, 4.55, LAV), (12.05, 4.55, YELLOW)]:
    shape(s, MSO_SHAPE.OVAL, x, y, 0.09, 0.09, c, None)

add_notes(s, "Здравствуйте! Тема моей работы — интерактивная интеллект-карта по английскому языку для 5 класса. Я покажу, как устроен ресурс и что показала его апробация.")

# =====================================================================
# 02 — PROBLEM
# =====================================================================
s = add_slide()
base(s, 2, "Проблема", "Материала много, а системы — мало", CORAL, 30)

items = [
    ("10", "модулей", "Spotlight 5: лексика, грамматика, чтение, культура — всё в одном курсе.", CORAL),
    ("1", "линейный конспект", "Списки и таблицы показывают материал, но не связи между темами.", YELLOW),
    ("0", "системных связей", "Темы повторяются отдельно и быстро забываются.", MINT),
]
for i, (num, label, desc, color) in enumerate(items):
    x = 0.75 + i * 3.85
    card(s, x, 1.85, 3.55, 3.35, CARD, BORDER)
    shape(s, MSO_SHAPE.RECTANGLE, x, 1.85, 3.55, 0.07, color, None)
    text(s, x + 0.28, 2.12, 1.2, 0.5, num, 36, color, True)
    text(s, x + 0.28, 2.72, 2.95, 0.35, label, 12, TEXT, True)
    text(s, x + 0.28, 3.25, 2.95, 1.55, desc, 11.5, MUTED, line_spacing=1.18)

shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, 0.75, 5.62, 11.85, 0.95, CARD2, BORDER, 0.12)
shape(s, MSO_SHAPE.RECTANGLE, 0.75, 5.62, 0.09, 0.95, CORAL, None)
text(s, 1.05, 5.62, 11.2, 0.95,
     "Нужен инструмент, который собирает курс в единую систему, а не просто хранит список тем.",
     14, TEXT, True, PP_ALIGN.LEFT, MSO_ANCHOR.MIDDLE)
add_notes(s, "Главная проблема: учебник даёт много материала, но школьник видит его линейно. Нужна опора, которая показывает связи.")

# =====================================================================
# 03 — GOAL / TASKS
# =====================================================================
s = add_slide()
base(s, 3, "Цель и задачи", "Собрать курс в одну карту и проверить её на практике", BLUE, 28)

card(s, 0.75, 1.82, 5.55, 3.15, CARD, BLUE)
shape(s, MSO_SHAPE.RECTANGLE, 0.75, 1.82, 0.08, 3.15, BLUE, None)
text(s, 1.05, 2.02, 4.9, 0.3, "ЦЕЛЬ", 10, BLUE, True)
text(s, 1.05, 2.38, 4.95, 2.05,
     "Разработать интерактивную карту по всем разделам Spotlight 5 и проверить, как она влияет на знания и мотивацию пятиклассников.",
     17, TEXT, False, line_spacing=1.12)
text(s, 1.05, 4.55, 4.9, 0.3, "Не просто сайт, а маршрут по курсу.", 9.5, MUTED)

tasks = [
    ("1", "Разобрать теорию"),
    ("2", "Спроектировать карту"),
    ("3", "Провести апробацию"),
    ("4", "Оценить динамику"),
]
for i, (num, label) in enumerate(tasks):
    y = 1.82 + i * 0.78
    number_badge(s, 6.9, y, 0.44, num, CORAL if i % 2 == 0 else YELLOW, BG, 11)
    text(s, 7.52, y + 0.03, 4.9, 0.55, label, 14, TEXT, True)

shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, 0.75, 5.38, 11.85, 1.05, CARD2, YELLOW, 0.10)
text(s, 2.75, 5.38, 9.7, 1.05,
     "**Гипотеза:** если карта встроена в урок и домашнюю работу, она повысит усвоение лексики, грамматики и чтения.",
     12.5, TEXT, False, line_spacing=1.14, anchor=MSO_ANCHOR.MIDDLE)
number_badge(s, 0.98, 5.65, 0.48, "?", YELLOW, BG, 16)

add_notes(s, "Цель — не просто сделать красивый сайт, а проверить его в учебном процессе. Задачи идут от теории к практике и оценке результата.")

# =====================================================================
# 04 — WHAT IS A MIND MAP
# =====================================================================
s = add_slide()
base(s, 4, "Теория", "Интеллект-карта — это не схема, а способ думать", LAV, 28)

text(s, 0.75, 1.82, 6.1, 0.45, "Центр → ветви → связи", 17, LAV, True)
text(s, 0.75, 2.35, 6.15, 3.3,
     "В центре — главное понятие. От него расходятся ветви: темы, слова, примеры. Ветви связаны между собой, а не просто стоят в списке.\n\n"
     "Ключевые слова, цвет и графические опоры помогают памяти: ученик не перечитывает абзац, а «видит» маршрут ответа.",
     12.5, MUTED, False, line_spacing=1.22)
text(s, 0.75, 6.42, 5.8, 0.25, "По методике Т. Бьюзена; в основе — идея связей, а не линейного списка.", 9, DIM)

# diagram
ring = shape(s, MSO_SHAPE.OVAL, 8.55, 2.0, 3.9, 3.9, None, RGBColor(0x26, 0x32, 0x52))
cx, cy = 10.5, 3.95
sat = [
    (7.45, 1.55, 1.75, MINT, "Vocabulary"),
    (11.45, 1.65, 1.55, CORAL, "Grammar"),
    (11.45, 4.95, 1.55, YELLOW, "Speaking"),
    (7.45, 5.05, 1.55, LAV, "Culture"),
]
for x, y, w, c, label in sat:
    connector(s, cx, cy, x + w / 2, y + 0.27, c, 1.5)
shape(s, MSO_SHAPE.OVAL, 9.78, 3.22, 1.45, 1.45, BLUE, None)
text(s, 9.78, 3.33, 1.45, 0.55, "SCHOOL", 11, WHITE, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)
text(s, 9.78, 3.85, 1.45, 0.22, "5 класс", 8, MUTED, True, PP_ALIGN.CENTER)
for x, y, w, c, label in sat:
    shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, 0.54, CARD2, c, 0.4)
    text(s, x, y, w, 0.54, label, 9.5, c, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)
text(s, 8.9, 6.18, 3.4, 0.22, "пример: одна тема — четыре ветви", 8.5, DIM, False, PP_ALIGN.CENTER)

add_notes(s, "Интеллект-карта — это радиальная структура. Важно не нарисовать красиво, а построить связи: от главного к частному.")

# =====================================================================
# 05 — WHY IT WORKS
# =====================================================================
s = add_slide()
base(s, 5, "Почему это работает", "Три опоры: возраст, память, нагрузка", MINT, 30)

items = [
    ("01", "11–12 лет", "Переход к абстрактному мышлению. Нужна наглядная опора, но без мелочей.", "возраст"),
    ("02", "Двойное кодирование", "Слово + образ запоминаются лучше, чем слово в списке.", "память"),
    ("03", "Когнитивная нагрузка", "Главное отделено от деталей — легче удерживать структуру.", "внимание"),
]
for i, (num, title, desc, tag) in enumerate(items):
    x = 0.75 + i * 3.85
    card(s, x, 1.88, 3.55, 3.45, CARD, BORDER)
    shape(s, MSO_SHAPE.RECTANGLE, x, 1.88, 3.55, 0.07, [MINT, YELLOW, CORAL][i], None)
    text(s, x + 0.3, 2.12, 0.8, 0.4, num, 18, [MINT, YELLOW, CORAL][i], True)
    text(s, x + 0.3, 2.62, 2.95, 0.5, title, 14, TEXT, True)
    text(s, x + 0.3, 3.18, 2.95, 1.55, desc, 11, MUTED, line_spacing=1.18)
    text(s, x + 0.3, 4.83, 2.95, 0.2, tag.upper(), 8, DIM, True)

shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, 0.75, 5.82, 11.85, 0.72, CARD2, BORDER, 0.12)
text(s, 1.0, 5.82, 11.35, 0.72,
     "Карта не украшает урок — она снижает нагрузку и удерживает связи между темами.",
     13.5, TEXT, True, PP_ALIGN.LEFT, MSO_ANCHOR.MIDDLE)

add_notes(s, "Психологические основания: возраст пятиклассников, теория двойного кодирования и ограничение когнитивной нагрузки. Карта работает на всех трёх уровнях.")

# =====================================================================
# 06 — RESOURCE NUMBERS
# =====================================================================
s = add_slide()
base(s, 6, "Наш ресурс", "121 тема, которую можно открыть за три клика", YELLOW, 29)

stats = [
    ("12", "разделов", BLUE, "Starter, модули 1–10, повторение"),
    ("70", "блоков", LAV, "лексика, грамматика, речь, культура"),
    ("121", "тема", MINT, "от слов до текстов и проектов"),
    ("12", "текстов для чтения", CORAL, "чтение с заданиями"),
    ("291", "задание с ответами", YELLOW, "для самопроверки"),
    ("36", "тестовых вопросов", ORANGE, "быстрая проверка понимания"),
]
for i, (num, label, color, desc) in enumerate(stats):
    x = 0.75 + (i % 3) * 3.85
    y = 1.72 + (i // 3) * 1.92
    card(s, x, y, 3.55, 1.65, CARD, BORDER)
    text(s, x + 0.25, y + 0.12, 1.1, 0.55, num, 30, color, True)
    text(s, x + 0.25, y + 0.78, 3.05, 0.28, label, 10.5, MUTED, True)
    text(s, x + 0.25, y + 1.12, 3.05, 0.3, desc, 8.2, DIM, False, line_spacing=1.0)

text(s, 0.75, 5.58, 3.0, 0.25, "ТРИ УРОВНЯ", 8.5, DIM, True)
levels = [("1", "Раздел"), ("2", "Блок"), ("3", "Тема")]
for i, (num, label) in enumerate(levels):
    x = 0.75 + i * 3.9
    shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, x, 5.9, 3.55, 0.62, CARD2, [BLUE, LAV, MINT][i], 0.16)
    number_badge(s, x + 0.12, 6.02, 0.36, num, [BLUE, LAV, MINT][i], BG, 10)
    text(s, x + 0.58, 5.9, 2.7, 0.62, label, 12, TEXT, True, PP_ALIGN.LEFT, MSO_ANCHOR.MIDDLE)
    if i < 2:
        text(s, x + 3.6, 5.9, 0.3, 0.62, "→", 14, DIM, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)
text(s, 0.75, 6.68, 11.7, 0.22, "Один клик — и карта перестраивается под нужный уровень.", 9.5, DIM)

add_notes(s, "В ресурсе 12 разделов, 70 блоков и 121 тема. Он охватывает весь курс, включая чтение, письмо и итоговое повторение.")

# =====================================================================
# 07 — INTERFACE
# =====================================================================
s = add_slide()
base(s, 7, "Как это устроено", "Карта, панель и практика в одном окне", BLUE, 29)

picture_card(s, SHOT_MAP, 0.72, 1.78, 7.45, 4.66)
text(s, 0.75, 6.55, 7.4, 0.25, "Светлая тема — для печати и проектора", 9, DIM)

callouts = [
    ("1", "Карта разделов", "12 узлов вокруг центра."),
    ("2", "Три уровня", "Раздел → блок → тема."),
    ("3", "Панель темы", "Слова, правила, задания."),
    ("4", "Поиск и прогресс", "Быстро найти и отметить."),
]
for i, (num, title, desc) in enumerate(callouts):
    y = 1.80 + i * 1.06
    number_badge(s, 8.62, y, 0.40, num, BLUE if i % 2 == 0 else MINT, BG, 10)
    text(s, 9.15, y - 0.01, 3.45, 0.30, title, 11.5, TEXT, True)
    text(s, 9.15, y + 0.28, 3.45, 0.45, desc, 9.5, MUTED)

chip(s, 8.62, 6.12, 3.9, 0.34, "HTML/CSS/JS  ·  локально  ·  без установки", CARD2, MINT, 8, BORDER)

add_notes(s, "Сайт устроен как карта: обзор, модуль, тема. Справа открывается панель с материалом. Есть поиск, прогресс и тренажёр слов.")

# =====================================================================
# 08 — WHAT IS INSIDE
# =====================================================================
s = add_slide()
base(s, 8, "Что внутри темы", "Не только слова, но и объяснение, ошибки и практика", CORAL, 27)

items = [
    ("01", "Зачем это нужно", "Короткое объяснение смысла темы.", MINT),
    ("02", "Так не говорят", "Типичная ошибка и правильный вариант.", CORAL),
    ("03", "Проверь себя", "Задания с кнопкой «Показать ответ».", YELLOW),
    ("04", "Reading & writing", "Текст, вопросы и письменная мастерская.", LAV),
]
for i, (num, title, desc, color) in enumerate(items):
    x = 0.75 + (i % 2) * 2.92
    y = 1.80 + (i // 2) * 2.22
    card(s, x, y, 2.65, 1.95, CARD, BORDER)
    shape(s, MSO_SHAPE.RECTANGLE, x, y, 2.65, 0.06, color, None)
    text(s, x + 0.18, y + 0.16, 0.7, 0.3, num, 11, color, True)
    text(s, x + 0.18, y + 0.48, 2.3, 0.55, title, 10.8, TEXT, True, line_spacing=1.0)
    text(s, x + 0.18, y + 1.08, 2.3, 0.75, desc, 8.8, MUTED, line_spacing=1.12)

picture_card(s, SHOT_READ, 6.62, 1.80, 5.95, 3.72)
text(s, 6.62, 5.68, 5.95, 0.55,
     "Объяснение → пример → практика", 13, MINT, True, PP_ALIGN.CENTER)
text(s, 6.62, 6.16, 5.95, 0.3,
     "Каждая тема заканчивается заданием, а не просто списком слов.", 9, DIM, False, PP_ALIGN.CENTER)

add_notes(s, "В каждой теме есть четыре слоя: зачем, как правильно, практика и чтение с письмом. Это превращает карту в рабочий инструмент, а не в справочник.")

# =====================================================================
# 09 — EXPERIMENT
# =====================================================================
s = add_slide()
base(s, 9, "Эксперимент", "24 ученика, 6 недель, три этапа", YELLOW, 30)

stats = [("24", "участника", BLUE), ("12 + 12", "ЭГ и КГ", MINT), ("6", "недель", YELLOW), ("3", "этапа", CORAL)]
for i, (num, label, color) in enumerate(stats):
    x = 0.75 + i * 3.15
    card(s, x, 1.72, 2.95, 1.12, CARD, BORDER)
    text(s, x + 0.2, 1.82, 2.55, 0.48, num, 22, color, True)
    text(s, x + 0.2, 2.30, 2.55, 0.25, label, 9.5, MUTED, True)

stages = [("1", "Констатирующий", "входная диагностика", BLUE), ("2", "Формирующий", "карта на уроке и дома", YELLOW), ("3", "Контрольный", "итоговая диагностика", MINT)]
for i, (num, title, desc, color) in enumerate(stages):
    x = 0.75 + i * 3.95
    shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, x, 3.2, 3.55, 0.78, CARD2, color, 0.15)
    number_badge(s, x + 0.12, 3.34, 0.40, num, color, BG, 10)
    text(s, x + 0.6, 3.24, 2.85, 0.28, title, 10.5, TEXT, True)
    text(s, x + 0.6, 3.54, 2.85, 0.25, desc, 8.2, MUTED)
    if i < 2:
        text(s, x + 3.58, 3.2, 0.3, 0.78, "→", 14, DIM, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)

card(s, 0.75, 4.38, 5.75, 1.55, CARD, MINT)
text(s, 1.0, 4.52, 2.4, 0.3, "ЭКСПЕРИМЕНТАЛЬНАЯ ГРУППА", 8.5, MINT, True)
text(s, 1.0, 4.86, 5.1, 0.55, "12 человек: карта на уроке (5–7 мин) и дома (10–15 мин).", 10.8, TEXT, line_spacing=1.15)
text(s, 1.0, 5.48, 5.1, 0.25, "Одинаковые тесты до и после.", 8.5, MINT, False, line_spacing=1.0)

card(s, 6.85, 4.38, 5.75, 1.55, CARD, BLUE)
text(s, 7.1, 4.52, 2.4, 0.3, "КОНТРОЛЬНАЯ ГРУППА", 8.5, BLUE, True)
text(s, 7.1, 4.86, 5.1, 0.55, "12 человек: учебник и рабочая тетрадь, те же часы.", 10.8, TEXT, line_spacing=1.15)
text(s, 7.1, 5.48, 5.1, 0.25, "Без карты и дополнительных заданий.", 8.5, BLUE, False, line_spacing=1.0)

text(s, 0.75, 6.22, 11.8, 0.25, "Диагностика: словарь · грамматика · чтение · мотивация", 9, MUTED, True)
text(s, 0.75, 6.55, 11.8, 0.25, "Статистика: U-критерий Манна–Уитни, уровень значимости p < 0,05", 9, DIM)

add_notes(s, "Эксперимент шёл шесть недель. В экспериментальной группе карта использовалась на уроке и дома, в контрольной — обычные задания по учебнику. До и после — одинаковая диагностика.")

# =====================================================================
# 10 — RESULTS TABLE
# =====================================================================
s = add_slide()
base(s, 10, "Результаты", "Прирост есть в обеих группах, но в ЭГ — заметно выше", CORAL, 26)

rows = [
    ["Показатель", "ЭГ до", "ЭГ после", "КГ до", "КГ после", "Δ ЭГ / КГ"],
    ["Словарь (20)", "9,4 ± 2,1", "15,8 ± 2,0", "9,2 ± 2,3", "11,3 ± 2,4", "+6,4 / +2,1"],
    ["Грамматика (12)", "6,1 ± 1,7", "9,3 ± 1,2", "6,3 ± 1,6", "7,4 ± 1,5", "+3,2 / +1,1"],
    ["Чтение (10)", "5,2 ± 1,4", "8,0 ± 1,1", "5,4 ± 1,3", "6,2 ± 1,2", "+2,8 / +0,8"],
    ["Мотивация (30)", "18,2 ± 3,1", "25,1 ± 2,4", "18,6 ± 2,9", "20,2 ± 2,8", "+6,9 / +1,6"],
]
tbl_shape = s.shapes.add_table(len(rows), 6, Inches(0.72), Inches(1.78), Inches(10.15), Inches(3.4))
tbl = tbl_shape.table
tbl.first_row = True
tbl.horz_banding = False
widths = [2.25, 1.45, 1.55, 1.45, 1.55, 1.9]
for i, w in enumerate(widths):
    tbl.columns[i].width = Inches(w)
for r, row in enumerate(rows):
    tbl.rows[r].height = Inches(0.56 if r else 0.62)
    for c, val in enumerate(row):
        cell = tbl.cell(r, c)
        cell.margin_left = Inches(0.07)
        cell.margin_right = Inches(0.05)
        cell.margin_top = Inches(0.02)
        cell.margin_bottom = Inches(0.02)
        cell.vertical_anchor = MSO_ANCHOR.MIDDLE
        cell.fill.solid()
        if r == 0:
            cell.fill.fore_color.rgb = CARD2
        elif c == 5:
            cell.fill.fore_color.rgb = RGBColor(0x14, 0x3B, 0x35)
        else:
            cell.fill.fore_color.rgb = CARD if r % 2 else RGBColor(0x11, 0x18, 0x2C)
        tf = cell.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.04)
        tf.margin_right = Inches(0.04)
        tf.margin_top = Inches(0.01)
        tf.margin_bottom = Inches(0.01)
        p = tf.paragraphs[0]
        p.alignment = PP_ALIGN.LEFT if c == 0 else PP_ALIGN.CENTER
        run = p.add_run()
        run.text = val
        run.font.name = FONT
        run.font.size = Pt(10.2 if r == 0 else 11.0)
        run.font.bold = (r == 0 or c == 5)
        run.font.color.rgb = MINT if c == 5 else (TEXT if r == 0 else TEXT if c == 0 else MUTED)

card(s, 11.08, 1.78, 1.52, 3.4, CARD2, MINT)
text(s, 11.14, 1.95, 1.4, 0.5, "p < 0,01", 13.5, MINT, True, PP_ALIGN.CENTER)
text(s, 11.14, 2.55, 1.4, 0.45, "U = 18–26", 10, TEXT, True, PP_ALIGN.CENTER)
text(s, 11.14, 3.02, 1.4, 1.7, "различия статистически значимы", 8.2, MUTED, False, PP_ALIGN.CENTER, line_spacing=1.2)
text(s, 0.75, 5.28, 10.0, 0.22, "M ± SD · n = 24 · 12 человек в каждой группе", 8.8, DIM)
kpis = [
    ("+6,4", "словарь", CORAL),
    ("+6,9", "мотивация", YELLOW),
    ("58,3%", "высокий уровень", MINT),
]
for i, (value, label, color) in enumerate(kpis):
    x = 0.75 + i * 3.85
    card(s, x, 5.58, 3.55, 1.03, CARD, color)
    text(s, x + 0.18, 5.64, 1.4, 0.4, value, 18, color, True)
    text(s, x + 0.18, 6.08, 3.1, 0.22, label.upper(), 7.5, MUTED, True)

add_notes(s, "В таблице — средние баллы до и после. По всем четырём показателям прирост в экспериментальной группе выше. Различия значимы на уровне p < 0,01.")

# =====================================================================
# 11 — CHART
# =====================================================================
s = add_slide()
base(s, 11, "Динамика", "Разрыв между группами вырос по всем показателям", MINT, 27)

chart_data = CategoryChartData()
chart_data.categories = ["Словарь", "Грамматика", "Чтение", "Мотивация"]
chart_data.add_series("ЭГ", (6.4, 3.2, 2.8, 6.9))
chart_data.add_series("КГ", (2.1, 1.1, 0.8, 1.6))
gf = s.shapes.add_chart(XL_CHART_TYPE.COLUMN_CLUSTERED, Inches(0.65), Inches(1.72), Inches(9.35), Inches(4.95), chart_data)
chart = gf.chart
chart.has_title = False
chart.has_legend = True
chart.legend.position = XL_LEGEND_POSITION.BOTTOM
chart.legend.include_in_layout = False
chart.font.name = FONT
chart.font.size = Pt(10.5)
chart.font.color.rgb = MUTED
try:
    chart.format.fill.background()
    chart.format.line.fill.background()
    chart.plots[0].format.fill.background()
except Exception:
    pass
plot = chart.plots[0]
plot.gap_width = 55
plot.overlap = -8
plot.has_data_labels = True
dl = plot.data_labels
dl.font.size = Pt(9.5)
dl.font.bold = True
dl.font.color.rgb = TEXT
dl.number_format = "0.0"
dl.number_format_is_linked = False
try:
    dl.position = XL_LABEL_POSITION.OUTSIDE_END
except Exception:
    pass

series_colors = [CORAL, BLUE]
for i, series in enumerate(chart.series):
    series.format.fill.solid()
    series.format.fill.fore_color.rgb = series_colors[i]
    series.format.line.fill.background()

chart.value_axis.minimum_scale = 0
chart.value_axis.maximum_scale = 8
chart.value_axis.major_unit = 2
chart.value_axis.has_major_gridlines = False
chart.value_axis.tick_labels.font.size = Pt(9.5)
chart.value_axis.tick_labels.font.color.rgb = DIM
chart.value_axis.format.line.color.rgb = BORDER
chart.category_axis.tick_labels.font.size = Pt(10.5)
chart.category_axis.tick_labels.font.color.rgb = TEXT
chart.category_axis.format.line.color.rgb = BORDER

card(s, 10.28, 1.78, 2.35, 1.12, CARD2, MINT)
text(s, 10.36, 1.86, 2.15, 0.42, "p < 0,01", 14, MINT, True, PP_ALIGN.CENTER)
text(s, 10.36, 2.32, 2.15, 0.25, "U = 18–26", 9, TEXT, True, PP_ALIGN.CENTER)

card(s, 10.28, 3.08, 2.35, 0.95, CARD, CORAL)
text(s, 10.4, 3.16, 2.1, 0.22, "СЛОВАРЬ", 8, CORAL, True)
text(s, 10.4, 3.42, 2.1, 0.4, "+6,4", 20, TEXT, True)

card(s, 10.28, 4.18, 2.35, 0.95, CARD, YELLOW)
text(s, 10.4, 4.26, 2.1, 0.22, "МОТИВАЦИЯ", 8, YELLOW, True)
text(s, 10.4, 4.52, 2.1, 0.4, "+6,9", 20, TEXT, True)

text(s, 10.28, 5.35, 2.35, 0.7, "Прирост среднего балла: ЭГ против КГ", 8.5, MUTED, False, PP_ALIGN.CENTER, line_spacing=1.15)

add_notes(s, "На диаграмме видно, что по всем показателям экспериментальная группа обогнала контрольную. Самый большой разрыв — по словарю и мотивации.")

# =====================================================================
# 12 — CONCLUSIONS
# =====================================================================
s = add_slide()
base(s, 12, "Выводы", "Карта работает, если она встроена в урок", BLUE, 29)

conclusions = [
    ("Материал собран", "12 разделов, 70 блоков и 121 тема — весь курс в одной навигации.", MINT),
    ("Практика обязательна", "Задания с ответами и чтение дают обратную связь, а не только наглядность.", YELLOW),
    ("Динамика значима", "Прирост в ЭГ выше по лексике, грамматике, чтению и мотивации.", CORAL),
]
for i, (title, desc, color) in enumerate(conclusions):
    y = 1.82 + i * 1.28
    number_badge(s, 0.75, y + 0.08, 0.42, "✓", color, BG, 13)
    text(s, 1.35, y, 7.9, 0.35, title, 13.5, TEXT, True)
    text(s, 1.35, y + 0.38, 7.9, 0.55, desc, 10.2, MUTED, line_spacing=1.14)

card(s, 9.55, 1.82, 3.05, 3.72, CARD, BORDER)
text(s, 9.8, 2.0, 2.6, 0.3, "ОГРАНИЧЕНИЯ", 8.5, DIM, True)
text(s, 9.8, 2.38, 2.55, 2.25,
     "Пилотная выборка: 24 ученика, 6 недель, одна школа.\n\n"
     "Нужен отсроченный срез и более широкая апробация.",
     9.2, MUTED, False, line_spacing=1.2)
text(s, 9.8, 4.65, 2.55, 0.55,
     "**Дальше:** 6–9 классы, аналитика, адаптивные задания.",
     8.2, MINT, False, line_spacing=1.15)

shape(s, MSO_SHAPE.ROUNDED_RECTANGLE, 0.75, 5.72, 11.85, 0.9, CARD2, MINT, 0.12)
text(s, 1.0, 5.72, 11.3, 0.9,
     "Карта не заменяет учебник — она делает повторение системным и проверяемым.",
     13, TEXT, True, PP_ALIGN.LEFT, MSO_ANCHOR.MIDDLE)

add_notes(s, "Вывод: ресурс полезен, но не вместо учебника. Главный эффект — системность и практика. Ограничение — небольшая пилотная выборка.")

# =====================================================================
# 13 — THANKS
# =====================================================================
s = add_slide()
deco(s, CORAL)
shape(s, MSO_SHAPE.OVAL, 8.6, 0.4, 5.2, 5.2, RGBColor(0x10, 0x17, 0x2A), None)
shape(s, MSO_SHAPE.OVAL, 9.35, 1.15, 3.7, 3.7, None, RGBColor(0x25, 0x31, 0x52))
shape(s, MSO_SHAPE.OVAL, 10.2, 2.0, 2.0, 2.0, CORAL, None)
text(s, 10.2, 2.0, 2.0, 2.0, "5", 54, BG, True, PP_ALIGN.CENTER, MSO_ANCHOR.MIDDLE)
text(s, 10.2, 3.55, 2.0, 0.2, "SPOTLIGHT", 7, BG, True, PP_ALIGN.CENTER)
for x, y, c in [(9.1, 1.5, MINT), (12.1, 2.4, YELLOW), (9.25, 4.4, LAV), (12.0, 4.55, BLUE)]:
    shape(s, MSO_SHAPE.OVAL, x, y, 0.12, 0.12, c, None)

text(s, 0.75, 1.35, 7.2, 0.3, "СПАСИБО", 10, CORAL, True)
text(s, 0.75, 1.75, 7.3, 1.0, "Спасибо!", 54, TEXT, True)
text(s, 0.75, 2.85, 7.2, 0.5, "за внимание", 22, MUTED)
text(s, 0.75, 3.75, 7.0, 0.4, "Вопросы?", 15, MINT, True)
text(s, 0.75, 4.35, 7.0, 1.2,
     "121 тема · 291 задание · 12 текстов\nКарта, которая показывает связи, а не просто хранит список.",
     11.5, MUTED, False, line_spacing=1.3)
text(s, 0.75, 6.65, 7.4, 0.25, "Презентация подготовлена по материалам сайта Spotlight 5", 8.5, DIM)

add_notes(s, "Спасибо за внимание! Готова ответить на вопросы о структуре карты, методике или результатах.")

prs.core_properties.title = "Интерактивная интеллект-карта Spotlight 5"
prs.core_properties.subject = "Презентация научно-исследовательской работы"
prs.core_properties.author = "Автор работы"
prs.save(OUT)
print(OUT)
