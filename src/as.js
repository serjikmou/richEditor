import E from "https://cdn.skypack.dev/wangeditor@4.6.4";
const editor = new E("#div1");
// 扩展自定义菜单
const { $, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;

class Insert extends DropListMenu {
  constructor(editor) {
    // 菜单栏中，标题菜单的 DOM 元素
    // 注意，这里的 $ 不是 jQuery ，是 E.$ （wangEditor 自带的 DOM 操作工具，类似于 jQuery）
    // data-title属性表示当鼠标悬停在该按钮上时提示该按钮的功能简述
    const $elem = $(
      '<div class="w-e-menu" data-title="插入"><i class="fa fa-address-book-o"></i></div>'
    );
    // droplist 配置
    const dropListConf = {
      width: 100,
      title: "插入",
      type: "list",
      list: [
        {
          $elem: $("<p>联系人姓名</p>"),
          value: "{{联系人姓名}}"
        },
        {
          $elem: $("<p>公司名</p>"),
          value: "{{公司名}}"
        }
      ],
      // droplist 每个 item 的点击事件
      clickHandler: (value) => {
        // value 参数即 dropListConf.list 中配置的 value
        this.command(value);
      }
    };
    super($elem, editor, dropListConf);
  }

  command(value) {
    // 插入
    this.editor.cmd.do("insertHTML", value);
  }

  // 菜单是否需要激活
  tryChangeActive() {}
}

class FontColor extends PanelMenu {
  constructor(editor) {
    const $elem = $(
      `<div class="w-e-menu" data-title="字体颜色">
          <i class="w-e-icon-pencil2"></i>
       </div>`
    );
    super($elem, editor);
  }

  /**
   * 菜单点击事件
   */
  clickHandler() {
    // 弹出 panel
    this.createPanel();
  }

  /**
   * 创建 panel
   */
  createPanel() {
    const conf = this.createPanelConf(this.editor);
    const panel = new Panel(this, conf);
    panel.create();
  }

  createPanelConf() {
    let that = this;
    const tabsConf = [
      {
        // tab 标题
        title: "字体颜色",
        // 判断type类型如果是image则以img的形式插入否则以内容
        tpl: `
          <div>
            <div class="wang-color-picker" style="display: flex; flex-direction: row; flex-wrap:wrap;">
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(191, 237, 210); border: 1px solid rgb(191, 237, 210);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(251, 238, 184); border: 1px solid rgb(251, 238, 184);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(248, 202, 198); border: 1px solid rgb(248, 202, 198);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(236, 202, 250); border: 1px solid rgb(236, 202, 250);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(194, 224, 244);border: 1px solid rgb(194, 224, 244);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(45, 194, 107);border: 1px solid rgb(45, 194, 107);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(241, 196, 15); border: 1px solid rgb(241, 196, 15);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(224, 62, 45); border: 1px solid rgb(224, 62, 45);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(185, 106, 217); border: 1px solid rgb(185, 106, 217);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(53, 152, 219); border: 1px solid rgb(53, 152, 219);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(22, 145, 121); border: 1px solid rgb(22, 145, 121);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(230, 126, 35); border: 1px solid rgb(230, 126, 35);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(186, 55, 42); border: 1px solid rgb(186, 55, 42);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(132, 63, 161); border: 1px solid rgb(132, 63, 161);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(35, 111, 161); border: 1px solid rgb(35, 111, 161);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(236, 240, 241); border: 1px solid rgb(236, 240, 241);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(206, 212, 217); border: 1px solid rgb(206, 212, 217);""></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(149, 165, 166); border: 1px solid rgb(149, 165, 166);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(126, 140, 141); border: 1px solid rgb(126, 140, 141);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(52, 73, 94); border: 1px solid rgb(52, 73, 94);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(52, 82, 233); border: 1px solid rgb(52, 82, 233);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(255, 255, 255); border: 1px solid rgb(255, 255, 255);"></div>
              <input style="height: 25px; width: 25px;" type="color" id="textColor" name="textColor">
            </div>
            <div class="w-e-button-container">
              <button id="wang-color-confirm" type="button" class="left" style="margin-top: 5px;">确定</button>
            </div>
          </div>
        `,
        events: [
          {
            selector: ".wang-color-picker-item",
            type: "click",
            fn: (e) => {
              // e为事件对象
              const $target = $(e.target);
              $target
                .parent()
                .find(".wang-color-picker-active")
                .removeClass("wang-color-picker-active");
              $target.addClass("wang-color-picker-active");
            }
          },
          {
            selector: "#textColor",
            type: "click",
            fn: (e) => {
              // e为事件对象
              const $target = $(e.target);
              $target
                .parent()
                .find(".wang-color-picker-active")
                .removeClass("wang-color-picker-active");
              $target.addClass("wang-color-picker-active");
            }
          },
          ,
          {
            selector: "#textColor",
            type: "input",
            fn: (e) => {
              // e为事件对象
              const $target = $(e.target);
              $target.attr("value", e.target.value);
            }
          },
          {
            selector: "#wang-color-confirm",
            type: "click",
            fn: (e) => {
              // e为事件对象
              const $target = $(e.target);
              const $colorEle = $target
                .parent()
                .parent()
                .find(".wang-color-picker-active");
              $colorEle.removeClass("wang-color-picker-active");
              const nodeName = $colorEle.getNodeName();
              let color = "#000000";
              if (nodeName === "DIV") {
                color = $colorEle.elems[0].style.backgroundColor;
              } else if (nodeName === "INPUT") {
                color = $colorEle.attr("value");
              }
              console.log($colorEle.elems[0].style);
              that.command(color);
              // $target.addClass('wang-color-picker-active');
              return true;
            }
          }
        ]
      }
    ];
    // }
    /* tabs配置项 =================================================================end*/
    // 最终的配置 -----------------------------------------
    const conf = {
      width: 195,
      tabs: tabsConf
    };
    return conf;
  }

  /**
   * 执行插入颜色的命令
   * @param {string} value 颜色
   */
  command(value) {
    var _a;
    const editor = this.editor;
    const isEmptySelection = editor.selection.isSelectionEmpty();
    const $selectionElem =
      (_a = editor.selection.getSelectionContainerElem()) === null ||
      _a === void 0
        ? void 0
        : _a.elems[0];
    if ($selectionElem == null) return;
    const isFont =
      ($selectionElem === null || $selectionElem === void 0
        ? void 0
        : $selectionElem.nodeName.toLowerCase()) !== "p";
    const isSameColor =
      ($selectionElem === null || $selectionElem === void 0
        ? void 0
        : $selectionElem.getAttribute("color")) === value;
    if (isEmptySelection) {
      if (isFont && !isSameColor) {
        const $elems = editor.selection.getSelectionRangeTopNodes();
        editor.selection.createRangeByElem($elems[0]);
        editor.selection.moveCursor($elems[0].elems[0]);
      }
      // 插入空白选区
      editor.selection.createEmptyRange();
    }
    // 获取选区范围的文字
    const $selectionText = editor.selection.getSelectionText();
    // 如果设置的是 a 标签就特殊处理一下，避免回车换行设置颜色无效的情况
    // 只处理选中a标签内全部文字的情况，因为选中部分文字不存在换行颜色失效的情况
    if (
      $selectionElem.nodeName === "A" &&
      $selectionElem.textContent === $selectionText
    ) {
      // 创建一个相当于占位的元素
      const _payloadElem = $("<span>&#8203;</span>").getNode();
      // 添加到a标签之后
      $selectionElem.appendChild(_payloadElem);
    }
    editor.cmd.do("foreColor", value);
    if (isEmptySelection) {
      // 需要将选区范围折叠起来
      editor.selection.collapseRange();
      editor.selection.restoreSelection();
    }
  }

  /**
   * 尝试修改菜单 active 状态
   */
  tryChangeActive() {}
}

class FontBg extends PanelMenu {
  constructor(editor) {
    const $elem = $(
      `<div class="w-e-menu" data-title="字体背景色">
          <i class="w-e-icon-paint-brush"></i>
       </div>`
    );
    super($elem, editor);
  }

  /**
   * 菜单点击事件
   */
  clickHandler() {
    // 弹出 panel
    this.createPanel();
  }

  /**
   * 创建 panel
   */
  createPanel() {
    const conf = this.createPanelConf(this.editor);
    const panel = new Panel(this, conf);
    panel.create();
  }

  createPanelConf() {
    let that = this;
    const tabsConf = [
      {
        // tab 标题
        title: "字体颜色",
        // 判断type类型如果是image则以img的形式插入否则以内容
        tpl: `
          <div>
            <div class="wang-color-picker" style="display: flex; flex-direction: row; flex-wrap:wrap;">
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(191, 237, 210); border: 1px solid rgb(191, 237, 210);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(251, 238, 184); border: 1px solid rgb(251, 238, 184);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(248, 202, 198); border: 1px solid rgb(248, 202, 198);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(236, 202, 250); border: 1px solid rgb(236, 202, 250);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(194, 224, 244);border: 1px solid rgb(194, 224, 244);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(45, 194, 107);border: 1px solid rgb(45, 194, 107);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(241, 196, 15); border: 1px solid rgb(241, 196, 15);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(224, 62, 45); border: 1px solid rgb(224, 62, 45);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(185, 106, 217); border: 1px solid rgb(185, 106, 217);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(53, 152, 219); border: 1px solid rgb(53, 152, 219);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(22, 145, 121); border: 1px solid rgb(22, 145, 121);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(230, 126, 35); border: 1px solid rgb(230, 126, 35);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(186, 55, 42); border: 1px solid rgb(186, 55, 42);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(132, 63, 161); border: 1px solid rgb(132, 63, 161);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(35, 111, 161); border: 1px solid rgb(35, 111, 161);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(236, 240, 241); border: 1px solid rgb(236, 240, 241);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(206, 212, 217); border: 1px solid rgb(206, 212, 217);""></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(149, 165, 166); border: 1px solid rgb(149, 165, 166);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(126, 140, 141); border: 1px solid rgb(126, 140, 141);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(52, 73, 94); border: 1px solid rgb(52, 73, 94);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(52, 82, 233); border: 1px solid rgb(52, 82, 233);"></div>
              <div class="wang-color-picker-item" style="height: 25px; width: 25px; background-color: rgb(255, 255, 255); border: 1px solid rgb(255, 255, 255);"></div>
              <input style="height: 25px; width: 25px;" type="color" id="textBg" name="textBg">
            </div>
            <div class="w-e-button-container">
              <button id="wang-bg-confirm" type="button" class="left" style="margin-top: 5px;">确定</button>
            </div>
          </div>
        `,
        events: [
          {
            selector: ".wang-color-picker-item",
            type: "click",
            fn: (e) => {
              // e为事件对象
              const $target = $(e.target);
              $target
                .parent()
                .find(".wang-color-picker-active")
                .removeClass("wang-color-picker-active");
              $target.addClass("wang-color-picker-active");
            }
          },
          {
            selector: "#textBg",
            type: "click",
            fn: (e) => {
              // e为事件对象
              const $target = $(e.target);
              $target
                .parent()
                .find(".wang-color-picker-active")
                .removeClass("wang-color-picker-active");
              $target.addClass("wang-color-picker-active");
            }
          },
          ,
          {
            selector: "#textBg",
            type: "input",
            fn: (e) => {
              // e为事件对象
              const $target = $(e.target);
              $target.attr("value", e.target.value);
            }
          },
          {
            selector: "#wang-bg-confirm",
            type: "click",
            fn: (e) => {
              // e为事件对象
              const $target = $(e.target);
              const $colorEle = $target
                .parent()
                .parent()
                .find(".wang-color-picker-active");
              $colorEle.removeClass("wang-color-picker-active");
              const nodeName = $colorEle.getNodeName();
              let color = "#000000";
              if (nodeName === "DIV") {
                color = $colorEle.elems[0].style.backgroundColor;
              } else if (nodeName === "INPUT") {
                color = $colorEle.attr("value");
              }
              console.log(color)
              that.command(color);
              return true;
            }
          }
        ]
      }
    ];
    // }
    /* tabs配置项 =================================================================end*/
    // 最终的配置 -----------------------------------------
    const conf = {
      width: 195,
      tabs: tabsConf
    };
    return conf;
  }

  /**
   * 执行插入颜色的命令
   * @param {string} value 颜色
   */
   command(value) {
        var _a;
        const editor = this.editor;
        const isEmptySelection = editor.selection.isSelectionEmpty();
        const $selectionElem = (_a = editor.selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.elems[0];
        if ($selectionElem == null)
            return;
        const isSpan = ($selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.nodeName.toLowerCase()) !== 'p';
        const bgColor = $selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.style.backgroundColor;
        const hexToRgb = function (hex) {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
          if (result == null) return null
          const colors = result.map(i => parseInt(i, 16))
          const r = colors[1]
          const g = colors[2]
          const b = colors[3]
          return `rgb(${r}, ${g}, ${b})`
        }
        const isSameColor = hexToRgb(value) === bgColor;
        if (isEmptySelection) {
            if (isSpan && !isSameColor) {
                const $elems = editor.selection.getSelectionRangeTopNodes();
                editor.selection.createRangeByElem($elems[0]);
                editor.selection.moveCursor($elems[0].elems[0]);
            }
            // 插入空白选区
            editor.selection.createEmptyRange();
        }
        editor.cmd.do('backColor', value);
        if (isEmptySelection) {
            // 需要将选区范围折叠起来
            editor.selection.collapseRange();
            editor.selection.restoreSelection();
        }
    }

  /**
   * 尝试修改菜单 active 状态
   */
  tryChangeActive() {}
}

// 菜单 key ，各个菜单不能重复
const menuKey = "insert";
const menuKey1 = "fontColor";
const menuKey2 = "fontBg";

// 注册菜单
editor.menus.extend(menuKey, Insert);
editor.menus.extend(menuKey1, FontColor);
editor.menus.extend(menuKey2, FontBg);

// 默认情况下，显示所有菜单
editor.config.menus = [
  "head",
  "bold",
  "fontSize",
  "fontName",
  "italic",
  "underline",
  "strikeThrough",
  "indent",
  "lineHeight",
  "fontColor",
  "fontBg",
  "link",
  "list",
  "todo",
  "justify",
  "quote",
  "emoticon",
  "image",
  "video",
  "table",
  "code",
  "splitLine",
  "insert", // 扩展自定义菜单
  "undo",
  "redo"
];
editor.create();
