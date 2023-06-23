PROMPTS = {
    "BIOGRAPHY":"""
        Then write a mid-length paragraph about the {job} {name}. 
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

        The paragraph can also eventually include the following information if they are relevent. If the following information are not relevent, then do not include it:
        - if there are notable controversy include it too, else don't write anything about the controversy.
        - if the person is dead: the person date and location of death.

    """,
    "HISTORY":"""history prompt {envent} here"""
}
