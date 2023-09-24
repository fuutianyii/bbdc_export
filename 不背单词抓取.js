function similar(s, t, f) {
    if (!s || !t) {
        return 0
    }
    var l = s.length > t.length ? s.length : t.length
    var n = s.length
    var m = t.length
    var d = []
    f = f || 3
    var min = function(a, b, c) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c)
    }
    var i, j, si, tj, cost
    if (n === 0) return m
    if (m === 0) return n
    for (i = 0; i <= n; i++) {
        d[i] = []
        d[i][0] = i
    }
    for (j = 0; j <= m; j++) {
        d[0][j] = j
    }
    for (i = 1; i <= n; i++) {
        si = s.charAt(i - 1)
        for (j = 1; j <= m; j++) {
            tj = t.charAt(j - 1)
            if (si === tj) {
                cost = 0
            } else {
                cost = 1
            }
            d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
        }
    }
    let res = (1 - d[n][m] / l)
    return res.toFixed(f)
}

function mainFunction() {
    var wordType = '四级'
    lasttv_array = []
    while (true) {
        //    toastLog("12312312");    
        if (id("ll_learn_band").exists()) {
            id("ll_learn_band").findOne().click();
            toastLog("StartExam1");
            sleep(500);
            if (id("button2").exists()) {
                id("button2").findOne().click();
                toastLog("StartExam2");
            };
        };
        sleep(500);
        //toastLog("确保进入背单词选择页面");
        option_num = 0;
        option = [];
        id("normal_container").find().forEach(function(tv) {
            option_item_num = 0
            const option_item = [];
            tv.children().forEach(function(tv) {
                option_item[option_item_num++] = tv.text()
                console.log(tv.text);
            });
            option[option_num++] = option_item;

        });

        if (id("tv_know").exists()) {
            id("tv_know").findOne().click();
        }
        console.log("click");
        word = id("tv_word").findOne().text();
        console.log("http://192.168.1.10/x.php?word=" + word);
        var r = http.get("http://192.168.1.10/x.php?word=" + word);
        response = r.body.string();
        console.log("获取到答案信息");
        if (response != '') {
            answer_arr = JSON.parse(response);
            max_similar = 0;
            for (j = 0; j < answer_arr.length; j++) {
                answer_arr[j]
                console.log("遍历选项");

                id("tv_selectItem").find().forEach(function(s) {
                    console.log(s.text());
                    console.log(answer_arr[j][0]);
                    similar_n = Number(similar(s.text(), answer_arr[j][0]));
                    console.log(Number(similar(s.text(), answer_arr[j][0])));
                    if (max_similar < similar_n) {
                        max_similar = similar_n;
                    }
                });
            };
            console.log("max_similar:" + max_similar);
            for (j = 0; j < answer_arr.length; j++) {
                id("tv_selectItem").find().forEach(function(s) {

                    if (Number(similar(s.text(), answer_arr[j][0])) == max_similar) {
                        s.parent().parent().parent().click();
                    }
                });
            };
        } else {
            if (id("tv_unknow").exists()) {
                console.log('暂无答案');
                id("tv_unknow").findOne().click();
            };
        }
        sleep(500);
        console.log('获取词意');
        var Word = {};
        Word.txt = id("tv_word").findOne().text();
        Word.词意容器 = id("interpret_content_container").findOne().child(0);
        Word.词意容器蒙住 = id("interpret_mask_view").findOnce();

        词性词义 = [];
        派生词汇 = [];
        if (Word.txt != "" && Word.词意容器 != null && Word.词意容器蒙住 == null) {
            Word.prononce = id("prononce_display").findOnce().text();
            for (var i = 0; i < Word.词意容器.childCount(); i++) {
                var child = Word.词意容器.child(i);
                console.log(child.child(0).text());
                词性词义[i] = Array(child.child(0).text(), child.child(1).text());
            };
            console.log(词性词义);
            tv_array_num = 0;
            tv_array = [];

            console.log('获取词根');


            if (className("android.widget.TextView").text("词根").exists()) {
                id("type_content").find().forEach(function(tv) {
                    tv_c_array_num = 0;
                    tv_c_array = [];
                    tv.parent().children().forEach(function(tv_c) {
                        console.log(tv_c_array_num);
                        tv_c_array[tv_c_array_num++] = tv_c.text();
                    });
                    tv_array[tv_array_num++] = tv_c_array;
                });
            }
            console.log(lasttv_array[0]);
            console.log(tv_array[0]);
            if (tv_array == lasttv_array) {
                tv_array = [];
                console.log("tv_error")
            } else {
                lasttv_array = tv_array;
            }
            console.log('短语');
            短语 = [];
            短语_num = 0;
            if (id("tv_content").exists()) {
                id("tv_content").find().forEach(function(tv) {
                    短语[短语_num++] = tv.text();
                });
            } else {
                短语 = [];
            }
            console.log('获取句子');
            var 句子容器 = id("word_main_sentence_container").findOnce();
            if (句子容器 != null) {
                Word.en_sentence = 句子容器.child(0).child(0).text();
                Word.ch_sentence = 句子容器.child(0).child(1).text();
            } else {
                Word.prononce = '';
                Word.ch_sentence = '';
            }
            console.log('获取派生');
            派生词汇 = []
            派生词汇_num = 0;

            if (className("android.widget.TextView").text("派生").clickable(true).depth(23).exists()) {
                className("android.widget.TextView").text("派生").clickable(true).depth(23).click()
                id("tv_derivative_content").find().forEach(function(tv) {
                    if (tv.text() != "") {
                        派生词汇[派生词汇_num++] = tv.text();
                        console.log(tv.text());
                    } else {
                        派生词汇 = []
                    }
                });
            }
            wordData = {
                "english": Word.txt,
                "meaning": JSON.stringify(词性词义),
                "derivative": JSON.stringify(派生词汇),
                "option": JSON.stringify(option),
                "roots_affixes": JSON.stringify(tv_array),
                "phrase": JSON.stringify(短语),
                "prononce": Word.prononce,
                "sentence_en": Word.en_sentence,
                "sentence_ch": Word.ch_sentence,
                "derivative": JSON.stringify(派生词汇), //派生词汇,
                "type": wordType,
                "undefined": undefined
            };
            var url = "http://192.168.1.10/x.php";
            r = http.post(url, wordData)
            if (id("bt_nextWord").exists()) {
                //toastLog("next");
                id("bt_nextWord").findOne().click()
            }
            if (id("right_button").exists()) {
                id("right_button").findOne().click()
                toastLog("下一课");
            }
        };
        //break
        sleep(1000);
    };
};


mainFunction()