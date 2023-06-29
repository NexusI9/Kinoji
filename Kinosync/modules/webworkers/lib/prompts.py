PROMPTS = {
    "BIOGRAPHY":"""
Write a mid-length paragraph about the {job} {name}. 
Use a formal and neutral tone. The paragraph should suit an audience well educated about cinema and can include technical terms as well as in-depth insights.
For every foreign movie titles, foreign people names, foreign cities names such as chinese, japanese, arabic, hebrew or russian names, city, title: write the original name in its original language in parenthesis next to it. 
As instance Wong Kar-Wai is a chinese name translated in english, so you should write next to it the original name (王家衛).

This short paragraph should include each of the following list items:
- the person name.
- the person nationality.
- the person date of birth.
- the person education background.
- the person inspiration and mentor.
- a short description of the person career path.
- the person major collaboration with other directors, artists or actors.
- the main characteristics of the person movies.
- what the person is known for.
- the person contribution to the cinema industry.

Feel free to add any other kinds of information that may be important in a biography.

The paragraph can also eventually include the following information if they are relevent. If the following information are not relevent, then do not include it:
- if there are notable controversy include it too, else don't write anything about the controversy.
- if the person is dead: the person date and location of death.

    """,
    "HISTORY":"""
Write a very short paragraph (2/3 sentences maximum) about the {event} historical event from {begin} that happened in {country}.
Do not start the paragraph by the name of the event. If necessary, rename the event with a more official and known name.
    """,

    "COLLECTION":"""
Write a mid-length paragraph about the {genre} cinema genre. 
Use a formal and neutral tone. The paragraph should suit an audience well educated about cinema and can include technical terms as well as in-depth insights. 

This short paragraph may include each of the following list items:
- The era or date when the genre emerged, include a date or a century, as well as its birth location
- Its main visual and/or technicals characteristics
- Where it took its inspiration from
- The public opinion towards the genre (acclaimed or subject to controversy)
- How the genre has evolved throughout its lifetime
- Its political commitment or message if there are were any
- Its philosophical commitment or message if there are were any
- How the genre influenced today's cinema landscape if it had any strong impact

Make a smooth and natural transition between each of these steps so it doesn't feel like your simply reply to the steps one by one.
You can also shuffle the steps.
    """,

}
