<template>
  <div>
    <Header></Header>
    <Sidebar></Sidebar>
    <div class="main-m">
      中间内容
      <div id="nav-card" class="nav-card">
        <div v-for="anchor in titles"
             :style="{ padding: `5px 0 10px ${anchor.indent * 20}px` }"
             @click="handleAnchorClick(anchor)">
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
      </div>
      <div class="main-content">
        <v-md-editor ref="preview" mode="preview" v-model="text" width="500px" height="100%"></v-md-editor>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from "axios";

  export default {
    name: 'index',
    data() {
      return {
        menuList: [],
        titles: [],
        text: "# 反射应用场景\n" +
          ">本文不讲解反射的基本使用，仅记录反射的特殊使用场景\n" +
          "\n" +
          "## 关于泛型\n" +
          "反射和泛型不能说是毫无关联，只能说在日常中一定沾不上边。\n" +
          "### 场景一\n" +
          "编写持久层，数据操作底层基类时，会出现几种情况：\n" +
          "1. 关联表不确定\n" +
          "2. 出参类不确定\n" +
          "3. mapper文件不确定\n" +
          "\n" +
          "所以作为基类需要连带泛型写进继承中。例：\n" +
          "\n" +
          "```java\n" +
          "public abstract class\n" +
          " BaseRepository<M extends BaseMapper<DO>, DO,CO> \n" +
          "extends ServiceImpl<M, DO> implements BaseGateway<CO> {\n" +
          "```\n" +
          "其中BaseGateway是自定义的基类接口。\n" +
          "那么就有了如下的特殊使用场景：\n" +
          "在持久层操作下，业务往往需要的是返回封装好的DO->CO的出参，所以基类中的所有需要通过**克隆**的方法返回表相关出参出去。\n" +
          "由于市面上所有的克隆方法都是基于：copy(数据，克隆.class)实现。\n" +
          "所以就需要积累中指定的泛型CO的class。\n" +
          "既就有了一下操作：\n" +
          "```java\n" +
          "    public BaseRepository() {\n" +
          "        Class<?> c = getClass();\n" +
          "        Type t = c.getGenericSuperclass();\n" +
          "        if (t instanceof ParameterizedType) {\n" +
          "            Type[] params = ((ParameterizedType) t).getActualTypeArguments();\n" +
          "            DOclass = (Class<?>)params[1];\n" +
          "            COclass = (Class<?>)params[2];\n" +
          "        }\n" +
          "    }\n" +
          "```\n" +
          "通过反射类**ParameterizedType**，参数化类型拿到任何<XX>中泛型类型![QQ图片20220302210528.gif](https://www.leyuna.xyz/image/2022-03-13/QQ图片20220302210528.gif){{{width=\"auto\" height=\"auto\"}}}\n" +
          "\n" +
          "## 关于类型\n" +
          "类型取自class，所以在仅知道class的条件下，类型转换上有很多很多的应用方式。\n" +
          "### 场景一\n" +
          "在仅有class类时，需要确定该class的类型时。\n" +
          "1. 第一种办法，直接通过**class.getName**，拿到其类的全类名。但是这只是字符串层面的表象确定，仅限于知道这个class是那个类，但无法对其进行额外的实例、赋予等操作。\n" +
          "2. 分类讨论：\n" +
          "**首先是第一**，确定该class是否是基本数据类型，**class.isPrimitive()**。\n" +
          "**其次第二**，判断该class是否是抽象属性：\n" +
          "```java\n" +
          "Class.isInterface() || Modifier.isAbstract(Class.getModifiers())\n" +
          "```\n" +
          "其中，**Modifier**是反射基础中的**修饰符工具类**，用于判断和获取某个类、变量或方法的修饰符。\n" +
          "**第三**，搭配业务场景，依次判断class所属类的顶级接口[父类]，例如当业务需求，这个class应该是一个接口时，可以通过\n" +
          "```\n" +
          "Collection.class.isAssignableFrom(class)\n" +
          "```\n" +
          "判断两类是否是 子父级关系。\n" +
          "**最后**，就是java中各包装类，Intege，Long等等的基本判断了。\n" +
          "### 场景二\n" +
          "当仅有一个类的类名时，需要确定该类的类型，反向操作最为致命![QQ图片20220302210531.jpg](https://www.leyuna.xyz/image/2022-03-13/QQ图片20220302210531.jpg){{{width=\"auto\" height=\"auto\"}}}。\n" +
          "1. 最简单的一种，通过**class.forName(className)**，拿到该类的class，然后如场景一中判断。\n" +
          "2. 在只知一个类的类名，甚至说这个类极有可能不是全类名的场景中时。我们是无法通过**class.forName(className)**，去获取类的class的。所以在代码的层面中，没有办法去确定它[类名]的属性的。\n" +
          "那么就需要把眼见拉大，跳出代码层面，到file文件中去探讨。\n" +
          "所以就有了如下的操作：\n" +
          "```java\n" +
          "   //通过loader加载所有类\n" +
          "    public static List<Class> loadClassByLoader(ClassLoader load){\n" +
          "        Enumeration<URL> urls = null;\n" +
          "        try {\n" +
          "            urls = load.getResources(\"\");\n" +
          "        } catch (IOException e) {\n" +
          "//            log(e.getMessage());\n" +
          "        }\n" +
          "        //放所有类型\n" +
          "        List<Class> classes = new ArrayList<>();\n" +
          "        while (urls.hasMoreElements()) {\n" +
          "            URL url = urls.nextElement();\n" +
          "            //文件类型\n" +
          "            if (url.getProtocol().equals(\"file\")) {\n" +
          "                loadClassByPath(null, url.getPath(), classes, load);\n" +
          "            }\n" +
          "        }\n" +
          "        return classes;\n" +
          "    }\n" +
          "\n" +
          "    private static void loadClassByPath(String root, String path, List<Class> list, ClassLoader load) {\n" +
          "        File f = new File(path);\n" +
          "        if(root==null) {\n" +
          "            root = f.getPath();\n" +
          "        }\n" +
          "        //判断是否是class文件\n" +
          "        if (f.isFile() && f.getName().matches(\"^.*\\\\.class$\")) {\n" +
          "            try {\n" +
          "                String classPath = f.getPath();\n" +
          "                //截取出className \n" +
          "                String className = classPath.substring(root.length()+1,classPath.length()-6).replace('/','.').replace('\\\\','.');\n" +
          "                list.add(load.loadClass(className));\n" +
          "            } catch (Exception ex) {\n" +
          "            }\n" +
          "        } else {\n" +
          "            File[] fs = f.listFiles();\n" +
          "            if (fs == null){\n" +
          "                return;\n" +
          "            }\n" +
          "            for (File file : fs) {\n" +
          "                loadClassByPath(root,file.getPath(), list, load);\n" +
          "            }\n" +
          "        }\n" +
          "    }\n" +
          "```\n" +
          "大义就是，通过启动类加载器的原理，获取到项目的根路径，然后以根路径进行文件迭代。取出所有.class的文件，然后这个类就是类的class字节码。接下来的操作就非常明确清晰了。\n" +
          "## 关于方法\n" +
          "在反射应用中，方法以及属性显得尤为核心。\n" +
          "### 场景一：\n" +
          "调用方法：\n" +
          "在反射调用方法的流程中：**class.forName()** 拿到class -> **getMethod** 拿到方法 -> invoke() 调用。\n" +
          "基础流程是这样走没错，但是很多节点中需要诸多条件。\n" +
          "比如**获取方法**时：\n" +
          "需要明确方法的参数列表 **Class<?>[]**。\n" +
          "\n" +
          "在**调用方法**时：\n" +
          "需要明确方法的入参,Object<?>[]。\n" +
          "\n" +
          "除此之外，在method.invoke(O1,O2) 。需要明确指名，O1的实例。\n" +
          "所以就引出了一个很严肃的问题。\n" +
          "调用方法的实例，我们真的能明确出来吗。\n" +
          "在透明的场景下时，很简单，甚至在知道了class文件后，可以直接new出来。\n" +
          "但是在框架工具的开发中，反射场景往往是模糊的。\n" +
          "即，我们不知道调用这个方法的实例属于什么，来自哪里。\n" +
          "它会是接口、抽象类、枚举、普通类...\n" +
          "所以在这个场景一，需要针对业务进行针对性的判断处理。\n" +
          "1. 在Spring环境下，调用方法中的参数若涉及到自动注入，则一定、只能从容器中取实例对象。\n" +
          "2. 在class为抽象属性时，需要通过文件迭代，或者从顶级接口出发，实例出他的可用对象。\n" +
          "3. 在没有无参构造的场景下，无法通过newInstance实例对象，所以可以通过获取他的所有构造方法，然后随机赋值拟造一个最简单的对象出来，但是在复杂场景下很不稳定。\n" +
          "4. ...\n" +
          "\n" +
          "## 关于特殊\n" +
          "\n"
      }
    },
    head() {
      return {
        title: '乐云一',
        meta: [
          {
            name: "keywords",
            content: "乐云一,博客,Java,后端开发,杂谈,番剧"
          }, {
            hid: 'description', name: 'names', content: '乐云一'
          }
        ]
      }
    },
    mounted: function () {
      this.loadBlogNav();
    },
    methods: {
      loadBlogNav() {
        const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
        const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
        if (!titles.length) {
          this.titles = [];
          return;
        }
        const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

        this.titles = titles.map((el) => ({
          title: el.innerText,
          lineIndex: el.getAttribute('data-v-md-line'),
          indent: hTags.indexOf(el.tagName),
        }));
      },
      handleAnchorClick(anchor) {
        return;
        const { preview } = this.$refs;
        const { lineIndex } = anchor;

        const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
        if (heading) {
          preview.scrollToTarget({
            target: heading,
            scrollContainer: window,
            top: 60,
          });
        }
      },
    },
  }
</script>
<style>
  .nav-card {
    float: right;
    position: sticky;
    top: 0;
    font-size: .9rem;
    margin-right: 290px;
  }
</style>
