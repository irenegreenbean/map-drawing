const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    message_progress_bar: "percentage complete",
    on_finish: function (data) {
        jsPsych.data.displayData('csv');
        //proliferate.submit({"trials": data.values()});
      }
  });

let timeline = [];


const irb = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
    <p style="width: 1000px; margin-bottom: -250px">
    We invite you to participate in a research study on language production and comprehension.
    <BR><BR>Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game.
    <BR><BR>There are no risks or benefits of any kind involved in this study.
    <BR><BR>You will be paid for your participation at the posted rate.
    <BR><BR>
    If you agree to participate, please proceed to the study tasks.
    </p>
    <p style="width: 1000px; font-size: 9pt; position: relative; top: 330px; padding-bottom: 30px; text-align: justify">
    If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.
    <BR><BR>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.
    </p>`,
    choices: ['Continue'],
    on_start: function() {
        jsPsych.setProgressBar(0)
    }
};
timeline.push(irb);

const map = {

  type: jsPsychSketchpad,
  prompt: '<p style="width:380px">Circle the mouth using red. Circle the eyes using blue.</p>',
  prompt_location: 'abovecanvas',
  stroke_color_palette: ['red', 'blue'],
  stroke_color: 'red',
  background_image: 'china_blankmap.jpeg',
  canvas_width: 750,
  canvas_height: 550,
  show_finished_button: true,
  finished_button_label: '完了',
  choices: ['d'],
  save_final_image: true,
  on_finish: function(data) {
    console.log(data)
  }


}

// timeline.push(map);



let sorting_stimuli =[];
for (var i = 1; i <= 5; i++) {
    sorting_stimuli.push("amanda_" + i + ".wav");
}
console.log(sorting_stimuli)


const sort_trial = {
    type: jsPsychFreeSort,
    stimuli: sorting_stimuli,
    stim_width: 80,
    stim_height: 60,
    sort_area_width: 500,
    sort_area_height: 500,
    prompt: "<p>Click and drag the images below to sort them so that similar items are close together.</p>"
    //choices: ['Continue'],
};

timeline.push(sort_trial)


// const irb = {
//     type: jsPsychHtmlButtonResponse,
//     stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
//     choices: ['Continue'],
//     on_start: function() {
//         jsPsych.setProgressBar(0)
//     }
// };
// timeline.push(irb);

// const intro_slide = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus:  `Please make sure that you are completing this experiment in a quiet room.
//     <BR><BR>This experiment should be completed on a desktop or laptop using the Google Chrome browser.
//     <BR><BR>You should use earphones or headphones for the duration of this experiment.
//     <BR><BR>Press the SPACE BAR to continue.`,
//     choices: [" "],
// };
// timeline.push(intro_slide);

// how to get things to show up in chinese
const intro_chinese = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:  `请在一间安静的屋子里做这个实验。
    <BR><BR>请用电脑来做这个实验。
    <BR><BR>请戴上您的耳机，用耳机来做这个实验。
    <BR><BR>请按空格键继续。`,
    choices: [" "],

    on_start: function() {
        jsPsych.setProgressBar(0)
    }
};
timeline.push(intro_chinese);


const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:  `In this experiment, you will listen to short audio clips.
    <BR><BR>After listening to each clip, please evaluate the speaker by indicating how much you agree or disagree with the provided statements.
    <BR><BR>Press the SPACE BAR to continue.`,
    choices: [" "],
    on_start: function() {
        jsPsych.setProgressBar(0)
    }
};
// timeline.push(instructions);

var likert_scale = [
  "Strongly Disagree", 
  "Disagree", 
  "Somewhat Disagree",
  "Neutral", 
  "Somewhat Agree",
  "Agree", 
  "Strongly Agree"
];

/* create array of stimuli and randomize stimuli*/
let tv_array = create_tv_array(trial_objects);
let stimuli = shuffle_array(tv_array);

/* create array of attributes and randomize attribute order per participant */
let raw_attributes = [
                {prompt: "This speaker is FRIENDLY.", name: 'Friendly', labels: likert_scale, required: true},
                // {prompt: "This speaker is KIND.", name: 'Kind', labels: likert_scale, required: true},
                // {prompt: "This speaker is HONEST.", name: 'Honest', labels: likert_scale, required: true},
                // {prompt: "This speaker is LIKEABLE.", name: 'Likeable', labels: likert_scale, required: true},
                // {prompt: "This speaker is RELIABLE.", name: 'Reliable', labels: likert_scale, required: true},
                // {prompt: "This speaker is HELPFUL.", name: 'Helpful', labels: likert_scale, required: true},
                // {prompt: "This speaker is CONFIDENT.", name: 'Confident', labels: likert_scale, required: true},
                // {prompt: "This speaker is AMBITIOUS.", name: 'Ambitious', labels: likert_scale, required: true},
                // {prompt: "This speaker is INTELLIGENT.", name: 'Intelligent', labels: likert_scale, required: true},
                // {prompt: "This speaker is EDUCATED.", name: 'Educated', labels: likert_scale, required: true},
                // {prompt: "This speaker is SELF CONFIDENT.", name: 'Self Confident', labels: likert_scale, required: true},
                // {prompt: "This speaker is WEALTHY.", name: 'Wealthy', labels: likert_scale, required: true},
                // {prompt: "This speaker is LEADERSHIP.", name: 'Leadership', labels: likert_scale, required: true},
                // {prompt: "This speaker is TRUSTWORTHY.", name: 'Trustworthy', labels: likert_scale, required: true},
                // {prompt: "This speaker is SINCERE.", name: 'Sincere', labels: likert_scale, required: true},
                // {prompt: "This speaker is HUMOROUS.", name: 'Humorous', labels: likert_scale, required: true},
                // {prompt: "This speaker is MODEST.", name: 'Modest', labels: likert_scale, required: true},
                // {prompt: "This speaker is CONTENT.", name: 'Content', labels: likert_scale, required: true},
                // {prompt: "This speaker is NOT SELFISH.", name: 'Not Selfish', labels: likert_scale, required: true},
                // {prompt: "This speaker is COURTEOUS.", name: 'Courteous', labels: likert_scale, required: true},
                // {prompt: "This speaker is FAIR.", name: 'Fair', labels: likert_scale, required: true},
                // {prompt: "This speaker is OBLIGING.", name: 'Obliging', labels: likert_scale, required: true},
                // {prompt: "This speaker is DILIGENT.", name: 'Diligent', labels: likert_scale, required: true},
                // {prompt: "This speaker is SOCIAL STATUS.", name: 'Social Status', labels: likert_scale, required: true},
                // {prompt: "This speaker is NOT SUPERSTITIOUS.", name: 'Not Superstitious', labels: likert_scale, required: true},
                // {prompt: "This speaker is OPEN.", name: 'Open', labels: likert_scale, required: true},
                // {prompt: "This speaker is GOOD LOOKING.", name: 'Good Looking', labels: likert_scale, required: true},
                // {prompt: "This speaker is HAVING CHARACTER.", name: 'Having Character', labels: likert_scale, required: true},
                ];


            
let attributes = shuffle_array(raw_attributes);

let filepath = function getaudio() {
    return jsPsych.timelineVariable("stimulus")
  };

let audio_path = "";
let clip_id = "";
let speaker_id = "";

/* rating trials */
const trials = {
    on_timeline_start: function() {
        jsPsych.setProgressBar(jsPsych.getProgressBarCompleted())
    },
    timeline: [

        {
            type: jsPsychAudioKeyboardResponse,
            choices: ['NO_KEYS'],
            stimulus: jsPsych.timelineVariable("stimulus"),
            response_allowed_while_playing: false,
            trial_ends_after_audio: true,
            prompt: `Listen to this audio clip.`,
            on_start: function() {
                jsPsych.setProgressBar(jsPsych.getProgressBarCompleted())
            },
        },
        {
            type: jsPsychSurveyLikert,
            preamble: function() {
              new_audio_path = "<audio controls src=" + '"' + jsPsych.timelineVariable("stimulus") + '"' + ">";
              return `<p>Press play to listen to the audio again.</p>
              <p>${new_audio_path}</p>
              <p>Rate how much you agree or disagree with the following statements:</p>`
            },
            questions: function() {
              return attributes
            },
            data: jsPsych.timelineVariable('data'),
            on_finish: function(data) {
                console.log(data.trial_index)
                console.log(data.trial_index/78)
                console.log(jsPsych.getProgressBarCompleted())
                jsPsych.setProgressBar(data.trial_index/78);
                console.log(jsPsych.getProgressBarCompleted())

            }
        },
        {
          type: jsPsychSurveyText,
          preamble: function() {
              new_audio_path = "<audio controls src=" + '"' + jsPsych.timelineVariable("stimulus") + '"' + ">";
              return `<p>Press play to listen to the audio again.</p>
              <p>${new_audio_path}</p>
              <p>Rate how much you agree or disagree with the following statements:</p>`
            },
          questions: [
            {
            prompt: 'Where do you think this person is from?',
            required: true
            }
          ],
          // data: jsPsych.timelineVariable('place'),
          // required: true,
          // how to collect data? also why won't this let me make it required??

        },

        // {
        //     type: jsPsychSurvey,
        //     pages: [
        //     [
        //     {
        //         type: 'likert',
        //         prompt: function() {
        //           new_audio_path = "<audio controls src=" + '"' + jsPsych.timelineVariable("stimulus") + '"' + ">";
        //           return `<p>Press play to listen to the audio again.</p>
        //           <p>${new_audio_path}</p>
        //           <p>Rate how much you agree or disagree with the following statements:</p>`
        //         },
        //         questions: function() {
        //           return attributes
        //         },
        //         data: jsPsych.timelineVariable('data'),

        //     },
        //       {

        //         type: 'text',
        //         prompt: "Where is this person from?", 
        //         // placeholder: 'City, State, Country',
        //         name: 'birthplace', 
        //         required: true,
        //       }, 
        //     ],
        //   ],
        // },

        ],
    timeline_variables: stimuli,
};
// timeline.push(trials);

// /* survey 1: demographic questions */
const survey1 = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'html',
        prompt: `<p style="color: #000000">Please answer the following questions:</p>`,
      },
      {
        type: 'multi-choice',
        prompt: "What is your citizenship status?",
        name: 'citizenship',
        options: ['Peoples Republic of China (China)', 'Republic of China (Taiwan)', 'Singapore', 'Other', 'Prefer not to answer'],
        required: true
      },
      {
        type: 'multi-choice',
        prompt: "What is your gender?",
        name: 'gender',
        options: ['Male', 'Female', 'Non-binary', 'Other', 'Prefer not to answer'],
        required: false,
      },
      {
        type: 'drop-down',
        prompt: "What year were you born?",
        name: 'age',
        options: ['2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', '1936', '1935', '1934', '1933', 'Prefer not to answer'],
        required: true,
      },
      {
        type: 'multi-select',
        prompt: "What is your race/ethnicity group? Please select all that apply.",
        name: 'race',
        options: ['Chinese', 'Cantonese', 'Malay', 'Indian', 'Other', 'Prefer not to answer'],
        required: true,
      },
      // {
      //   type: 'text',
      //   prompt: "What is your estimated total monthly household income (in Singapore dollars)?",
      //   name: 'income',
      //   textbox_columns: 8,
      //   input_type: "number",
      //   required: true,
      // },
      {
        type: 'multi-choice',
        prompt: "What is your highest level of education?",
        name: 'education',
        options: ['No qualification', 'Primary school', 'Secondary school', 'Junior college/Polytechnic', 'Undergraduate degree', 'Postgraduate degree', 'Prefer not to answer'],
        required: false,
      }
    ]
  ],
  button_label_finish: 'Continue',
};
timeline.push(survey1);


// /* survey: family questions */
const survey_family = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'html',
        prompt: `<p style="color: #000000">Please answer the following questions:</p>`,
      },

      {
        type: 'text',
        prompt: "Where do you live now (e.g. province, city)?",
        name: 'now_live',
        input_type: "text",
        required: true,
      },
      {
        type: 'text',
        prompt: "Where is your family from (e.g. province, city)?",
        name: 'family_from',
        input_type: "text",
        required: true,
      },
      {
        type: 'multi-choice',
        prompt: "Have you moved before in your life?",
        name: 'moved',
        options: ['Yes', 'No'],
        required: true,
      },
        {
        type: 'text',
        prompt: "If you have moved, where did you move and for how long?",
        name: 'moved_places',
        input_type: "text",
        required: false,
      },

    ]
  ],
  button_label_finish: 'Continue',
};
// timeline.push(survey_family);


// /* survey 2: language background questions */
const survey2a = {
  type: jsPsychSurveyHtmlForm,
  preamble: `<p>What languages do you speak?</p>
  <p>Please indicate up to 5 languages and list them <b>in order of descending frequency of use</b>, i.e., Language 1 is the most frequently spoken language, Language 2 the second-most frequently spoken language, and so on.</p>
  <p>For example, if Mandarin Chinese is Language 1, Cantonese is Language 2, and Hokkien is Language 3, that means you speak Mandarin Chinese the most frequently, Cantonese the second-most frequently, and Hokkien the least frequently.
  </p>`,
  html: `<p>
  <input name="lang1" type="text" placeholder="Language 1" required><BR><BR>
  <input name="lang2" type="text" placeholder="Language 2"><BR><BR>
  <input name="lang3" type="text" placeholder="Language 3"><BR><BR>
  <input name="lang4" type="text" placeholder="Language 4"><BR><BR>
  <input name="lang5" type="text" placeholder="Language 5">
  </p>`
};
// timeline.push(survey2a);

const survey2b = {
  type: jsPsychSurvey,
  pages: [
    [
      {
        type: 'multi-choice',
        prompt: "Do you speak Mandarin Chinese?",
        name: 'mandarin',
        options: ['Yes', 'No'],
        required: true,
      },
      {
        type: 'text',
        prompt: "How many hours a day do you spend interacting in Mandarin Chinese?",
        name: 'mandarin_hours',
        input_type: "number",
        required: true,
      },
      {
        type: 'multi-choice',
        prompt: "Do your friends speak Mandarin Chinese?",
        name: 'mandarin_friends',
        options: ['Yes', 'No'],
        required: true,
      },
      {
        type: 'likert',
        prompt: "How often do your friends speak Mandarin Chinese?",
        name: 'mandarin_friends_frequency',
        required: true,
        likert_scale_min_label: 'Never',
        likert_scale_max_label: 'All the time',
        likert_scale_values: [
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 }
        ]
      },
      {
        type: 'multi-choice',
        prompt: "Does your family speak Mandarin Chinese?",
        name: 'mandarin_family',
        options: ['Yes', 'No'],
        required: true,
      },
      {
        type: 'likert',
        prompt: "How often does your family speak Mandarin Chinese?",
        name: 'mandarin_family_frequency',
        required: true,
        likert_scale_min_label: 'Never',
        likert_scale_max_label: 'All the time',
        likert_scale_values: [
          { value: 1 },
          { value: 2 },
          { value: 3 },
          { value: 4 },
          { value: 5 }
        ]
      },
    ],
  ],
  button_label_finish: 'Continue',
};
// timeline.push(survey2b);


// /* payment information */
// const payment = {
//   type: jsPsychSurveyText,
//   questions: [
//     {
//       prompt: `
//             <p>Please provide your email address in the field below for participant reimbursement purposes.</p>
//             `,
//       name: 'payment'
//     }
//   ]
// };
// timeline.push(payment);

// /* future study? */
// const futurestudies = {
//   type: jsPsychSurvey,
//   pages: [
//     [
//       {
//         type: 'multi-choice',
//         prompt: "Do you consent to being contacted for future studies?",
//         name: 'futurestudies',
//         options: ['Yes', 'No'],
//         required: true,
//       }
//     ]
//   ],
//   button_label_finish: 'Continue',
// };
// timeline.push(futurestudies);

// /* thank u */
// const thankyou = {
//   type: jsPsychHtmlButtonResponse,
//   stimulus: `
//             <p>Thank you for completing the experiment!</p>
//             <p>We will contact you soon to arrange for participant reimbursement.</p>
//             <p>Please click the "Submit" button to submit your responses and complete the study.</p>
//       `,
//   choices: ["Submit"],
// };
// timeline.push(thankyou);

jsPsych.run(timeline);


//


//


// const jsPsych = initJsPsych({
//     on_finish: function () {
//         jsPsych.data.displayData('csv');
//       }

//     //on_finish: function(data) {
//         //proliferate.submit({"trials": data.values()});
//     //}
//   });

// let timeline = [];

// // push experiment logic the timeline here...
// // ......
// const irb = {
//     // Which plugin to use
//     type: jsPsychHtmlButtonResponse,
//     // What should be displayed on the screen
//     stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
//     // What should the button(s) say
//     choices: ['Continue']
// };

// // push to the timeline
// timeline.push(irb)

// const instructions = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: "In this experiment, you will hear a series of words. If it's your first time hearing the word, press 'D' for NEW. If you've already heard the word during the task, press 'K' for OLD. Try to respond as quickly and accurately as you can.<br>When you're ready to begin, press the space bar.",
//     choices: [" "]
// };
// timeline.push(instructions);

// let tv_array = create_tv_array(trial_objects);
// let randomized = shuffle_array(tv_array);

// let likert_scale = [
//   "Strongly Disagree", 
//   "Disagree", 
//   "Neutral", 
//   "Agree", 
//   "Strongly Agree"
// ];

// let attributes = [
//             {prompt: "This speaker is FRIENDLY.", name: 'Friendly', labels: likert_scale},
//             {prompt: "This speaker is KIND.", name: 'Kind', labels: likert_scale},
//             {prompt: "This speaker is HONEST.", name: 'Honest', labels: likert_scale},
//             {prompt: "This speaker is LIKEABLE.", name: 'Likeable', labels: likert_scale},
//             {prompt: "This speaker is RELIABLE.", name: 'Reliable', labels: likert_scale},
//             {prompt: "This speaker is HELPFUL.", name: 'Helpful', labels: likert_scale},
//             {prompt: "This speaker is CONFIDENT.", name: 'Confident', labels: likert_scale},
//             {prompt: "This speaker is AMBITIOUS.", name: 'Ambitious', labels: likert_scale},
//             {prompt: "This speaker is INTELLIGENT.", name: 'Intelligent', labels: likert_scale},
//             {prompt: "This speaker is EDUCATED.", name: 'Educated', labels: likert_scale},
//             {prompt: "This speaker is SELF CONFIDENT.", name: 'Self Confident', labels: likert_scale},
//             {prompt: "This speaker is WEALTHY.", name: 'Wealthy', labels: likert_scale},
//             {prompt: "This speaker is LEADERSHIP.", name: 'Leadership', labels: likert_scale},
//             {prompt: "This speaker is TRUSTWORTHY.", name: 'Trustworthy', labels: likert_scale},
//             {prompt: "This speaker is SINCERE.", name: 'Sincere', labels: likert_scale},
//             {prompt: "This speaker is HUMOROUS.", name: 'Humorous', labels: likert_scale},
//             {prompt: "This speaker is MODEST.", name: 'Modest', labels: likert_scale},
//             {prompt: "This speaker is CONTENT.", name: 'Content', labels: likert_scale},
//             {prompt: "This speaker is NOT SELFISH.", name: 'Not Selfish', labels: likert_scale},
//             {prompt: "This speaker is COURTEOUS.", name: 'Courteous', labels: likert_scale},
//             {prompt: "This speaker is FAIR.", name: 'Fair', labels: likert_scale},
//             {prompt: "This speaker is OBLIGING.", name: 'Obliging', labels: likert_scale},
//             {prompt: "This speaker is DILIGENT.", name: 'Diligent', labels: likert_scale},
//             {prompt: "This speaker is SOCIAL STATUS.", name: 'Social Status', labels: likert_scale},
//             {prompt: "This speaker is NOT SUPERSTITIOUS.", name: 'Not Superstitious', labels: likert_scale},
//             {prompt: "This speaker is OPEN.", name: 'Open', labels: likert_scale},
//             {prompt: "This speaker is GOOD LOOKING.", name: 'Good Looking', labels: likert_scale},
//             {prompt: "This speaker is HAVING CHARACTER.", name: 'Having Character', labels: likert_scale},

//             ];
// let ran_attributes = shuffle_array(attributes);


// let audio_path = "";


// const trials = {
//     timeline: [
//         {
//             type: jsPsychAudioKeyboardResponse,
//             choices: ["NO_KEYS"],
//             stimulus: jsPsych.timelineVariable('stimulus'),
//             response_allowed_while_playing: false,
//             //trial_duration: 4000,
//             prompt: "Please listen to the current clip carefully.",
//             trial_ends_after_audio: true,
//             on_finish: function(data) {
//                 evaluate_response(data);
//             },
//             data: jsPsych.timelineVariable('data')
//         },

//         //`<audio controls src=` + audio_path + `></audio>`


//         // {
//         //     [
//         //       {
//         //         type: 'likert-table',
//         //         prompt: ' ',
//         //         statements: [
//         //           {prompt: 'I like to eat vegetables', name: 'VeggiesTable'},
//         //           {prompt: 'I like to eat fruit', name: 'FruitTable'},
//         //           {prompt: 'I like to eat meat', name: 'MeatTable'},
//         //         ],
//         //         options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
//         //       }
//         //     ]

//         // },
//         {
//             type: jsPsychSurveyLikert,
//             on_start: function(){
//                 audio_path = jsPsych.timelineVariables('stimulus')
//             },
//            // let new_audio_path = `<audio controls src=` + audio_path + `></audio>`
//             preamble: `<audio controls src= + audio_path + ></audio>`,
//             // preamble: `<div id="soundtrack"></div>
//             // <button onClick="setSong()">Set Song</button>`,
//             //stimulus: jsPsych.timelineVariable('stimulus'),
//             questions: function(){
//                 return ran_attributes;
//             }
//         },
//         // {
//         //   type: jsPsychSurvey,
//         //   pages: [
//         //     [
//         //       {
//         //         type: 'html',
//         //         prompt: 'Please answer the following questions:',
//         //       },
//         //       {
//         //         type: 'multi-choice',
//         //         prompt: "Which of the following do you like the most?", 
//         //         name: 'VegetablesLike', 
//         //         options: ['Tomato', 'Cucumber', 'Eggplant', 'Corn', 'Peas'], 
//         //         required: true
//         //       }, 
//         //       {
//         //         type: 'multi-select',
//         //         prompt: "Which of the following do you like?", 
//         //         name: 'FruitLike', 
//         //         options: ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry'], 
//         //         required: false,
//         //       },
//         //     ],
//         //   ],
//         // },
//     ],
//     timeline_variables: randomized,
//     // randomize_order: true
// }
// timeline.push(trials);

// // const trial_1 = {
// //     type: jsPsychAudioKeyboardResponse,
// //     choices: ['d', 'k'],
// //     stimulus: 'audio/Violin.wav',
// //     response_allowed_while_playing: false,
// //     trial_duration: 4000,
// //     prompt: `<div class=\"option_container\">
// //     			<div class=\"option\">NEW<br><br><b>D</b></div>
// //     			<div class=\"option\">OLD<br><br><b>K</b></div>
// //     		</div>`,
// //     data: {
// //         correct: "NEW"
// //     },
// //     on_finish: function(data) {
// //         evaluate_response(data);
// //     }
// // }

// // const trial_2 = {
// //     type: jsPsychAudioKeyboardResponse,
// //     prompt: "<div class=\"option_container\"><div class=\"option\">NEW<br><br><b>D</b></div><div class=\"option\">OLD<br><br><b>K</b></div></div>",
// //     choices: ["d", 'k'],
// //     stimulus: "audio/Bologna.wav",
// //     trial_duration: 4000,
// //     response_allowed_while_playing: false,
// //     data: {
// //         correct: "NEW"
// //     },
// //     on_finish: function(data) {
// //         evaluate_response(data)
// //     }
// // }

// // timeline.push(trial_1, trial_2);

// // const trials = {
// //     type: jsPsychAudioKeyboardResponse,
// //     choices: ['d', 'k'],
// //     response_allowed_while_playing: false,
// //     trial_duration: 4000,
// //     // randomize_order: true,
// //     prompt: `<div class=\"option_container\"><div class=\"option\">NEW<br><br><b>D</b></div><div class=\"option\">OLD<br><br><b>K</b></div></div>`,
// //     data: {
// //         correct: "NEW"
// //     },
// //     on_finish: function(data) {
// //         evaluate_response(data);
// //     },
// //     timeline: [
// //         {stimulus: 'audio/Violin.wav', data: {correct: "NEW"}},
// //         {stimulus: 'audio/Bologna.wav', data: {correct: "NEW"}},
// //         {stimulus: 'audio/Violin.wav', data: {correct: "OLD"}},
// //         {stimulus: 'audio/Bologna.wav', data: {correct: "OLD"}}
// //     ]
// // }
// // timeline.push(trials)

// // let likert_scale = [
// //   "Strongly Disagree", 
// //   "Disagree", 
// //   "Neutral", 
// //   "Agree", 
// //   "Strongly Agree"
// // ];

// // let trial_likert = {
// //   type: jsPsychSurveyLikert,
// //   questions: [
// //     {prompt: "This speaker is FRIENDLY.", name: 'Friendly', labels: likert_scale},
// //     {prompt: "This speaker is EDUCATED.", name: 'Educated', labels: likert_scale},
// //     {prompt: "This speaker is INTELLIGENT.", name: 'Intelligent', labels: likert_scale},
// //     {prompt: "This speaker is TRUSTWORTHY.", name: 'Trustworthy', labels: likert_scale},
// //   ],
//   // randomize_question_order: true //this shuffles WITHIN. get rid of this once there is the more controlled shuffle
//   //is this randomizing the order in which the attributes show up? random acros participants and consistent within particpants
//   // if not, how then?
//   // write a helper function that generates an array of the words (attributes),
//   // input into the helper function be these four objects, shuffle it, and then have that output array be the input to the questions parameter
//   // how to we make sure participants answer every single attribute? use the required: true parameter 
//   // alternate trial types, where you have one page where it's just listen to this audio
//   // the second type of trial where you embed the audio into a social questionnaire plugin and they can relisten to the same audio but 
//   // then it forces them to listen at least once
//   // use survey plugin https://www.jspsych.org/7.2/plugins/survey/
//   // then put audio inside "prompt" in the string of html text 
//   // you need a special css that is only available thru cdn

//   // const, var, or let
//   // const is constant and has to stay that way
//   // let you can change, like let array = []
//   // prompts can be just a string of text
//   // there is an html tag that you can use to embed audio (just an audio) for the prompt
//   // src is the path to the file 

//   // link stimuli to stimuli in both audio keyboard plugin and survey plugin

//   // js file for free sort, see how the icons are defined, where the paths to the photos are going, and then get into that html element
//   // then in that html element add something that can play audio

// // };

// //timeline.push(trial_likert)


// jsPsych.run(timeline)