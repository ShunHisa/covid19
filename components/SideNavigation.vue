<template>
  <div ref="Side" class="SideNavigation" tabindex="-1">
    <header class="SideNavigation-Header">
      <v-icon
        class="SideNavigation-OpenIcon"
        :aria-label="'サイドメニュー項目を開く'"
        @click="$emit('openNavi', $event)"
      >
        mdi-menu
      </v-icon>
      <h1 class="SideNavigation-HeaderTitle">
        <nuxt-link :to="localePath('/')" class="SideNavigation-HeaderLink">
          <img
            class="SideNavigation-HeaderLogo"
            src="/logo.svg"
            :alt="'北九州市'"
          />
          <div class="SideNavigation-HeaderText">
            {{ '新型コロナウイルス感染症' }}<br />{{ '情報サイト' }}
          </div>
        </nuxt-link>
      </h1>
    </header>

    <div :class="['SideNavigation-Body', { '-opened': isNaviOpen }]">
      <v-icon
        class="SideNavigation-CloseIcon"
        :aria-label="'サイドメニュー項目を閉じる'"
        @click="$emit('closeNavi', $event)"
      >
        mdi-close
      </v-icon>

      <nav class="SideNavigation-Menu">
        <div class="SideNavigation-Language">
          <div
            v-if="this.$i18n.locales.length > 1"
            class="SideNavigation-Language"
          >
            <label class="SideNavigation-LanguageLabel" for="LanguageSelector">
              {{ '多言語対応選択メニュー' }}
            </label>
            <language-selector />
          </div>
        </div>
        <menu-list :items="items" @click="$emit('closeNavi', $event)" />
      </nav>

      <footer class="SideNavigation-Footer">
        <div class="SideNavigation-Social">
          <a
            href="https://page.line.me/zng7240n"
            target="_blank"
            rel="noopener noreferrer"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/line.webp" type="image/webp" />
              <img src="/line.png" alt="LINE" />
            </picture>
          </a>
          <a
            href="https://twitter.com/city_kitakyushu"
            target="_blank"
            rel="noopener noreferrer"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/twitter.webp" type="image/webp" />
              <img src="/twitter.png" alt="Twitter" />
            </picture>
          </a>
          <a
            href="https://www.facebook.com/city.of.kitakyushu"
            target="_blank"
            rel="noopener noreferrer"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/facebook.webp" type="image/webp" />
              <img src="/facebook.png" alt="Facebook" />
            </picture>
          </a>
          <a
            href="https://www.youtube.com/user/KitakyuMovieChannel"
            target="_blank"
            rel="noopener noreferrer"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/youtube.webp" type="image/webp" />
              <img src="/youtube.png" alt="video" />
            </picture>
          </a>
          <a
            href="https://github.com/covid19-kitakyushu/covid19"
            target="_blank"
            rel="noopener noreferrer"
            class="SideNavigation-SocialLink"
          >
            <picture>
              <source srcset="/github.webp" type="image/webp" />
              <img src="/github.png" alt="GitHub" />
            </picture>
          </a>
        </div>
        <div class="SideNavigation-Footer">
          協力：
          <br />
          <div class="SideNavigation-organization">
            <a
              href="https://www.city.kitakyushu.lg.jp/"
              target="_blank"
              rel="noopener"
            >
              <img src="/logo-kitakyushu.png" alt="北九州市" />
            </a>
            北九州市
          </div>
        </div>
        <div class="SideNavigation-Footer">
          <div class="SideNavigation-organization">
            <a
              href="https://www.ksrp.or.jp/fais/"
              target="_blank"
              rel="noopener"
            >
              <img src="/logo-fais.png" alt="FAIS" />
            </a>
            北九州産業学術推進機構
          </div>
        </div>
        <div class="SideNavigation-Footer">
          運営 (50音順)：
          <br />
          <div class="SideNavigation-organization">
            <a
              href="https://www.facebook.com/CfKTQ/"
              target="_blank"
              rel="noopener"
            >
              <img src="/logo-code4kitakyushu.png" alt="Code for Kitakyushu" />
            </a>
            Code for Kitakyushu
          </div>
        </div>
        <div class="SideNavigation-Footer">
          <div class="SideNavigation-organization">
            <a href="https://freudegizmo.com/" target="_blank" rel="noopener">
              <img src="/logo-freudegizmo.png" alt="フロイデギズモ" />
            </a>
            株式会社フロイデギズモ
          </div>
        </div>
        <div class="SideNavigation-Footer">
          <div class="SideNavigation-organization">
            <a href="http://www.houyou.co.jp/" target="_blank" rel="noopener">
              <img src="/logo-houyou.png" alt="Houyou" />
            </a>
            Houyou株式会社
          </div>
        </div>
        <div class="SideNavigation-Footer">
          <div class="SideNavigation-organization">
            <a href="https://www.lac.co.jp/" target="_blank" rel="noopener">
              <img src="/logo-lac.png" alt="ラック" />
            </a>
            株式会社ラック
          </div>
        </div>
        <small class="SideNavigation-Copyright">
          {{ $t('このサイトの内容物は') }}
          <a
            :href="$t('https://creativecommons.org/licenses/by/4.0/deed.ja')"
            target="_blank"
            rel="license"
            class="SideNavigation-LicenseLink"
          >
            {{ $t('クリエイティブ・コモンズ 表示 4.0 ライセンス') }}
          </a>
          {{ $t('の下に提供されています。') }}
          <br />
          2020 City of Kitakyushu
        </small>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'
import LanguageSelector from '@/components/LanguageSelector.vue'
import MenuList from '@/components/MenuList.vue'

type Item = {
  icon?: string
  title: TranslateResult
  link: string
  divider?: boolean
}

export default Vue.extend({
  components: {
    LanguageSelector,
    MenuList
  },
  props: {
    isNaviOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    items(): Item[] {
      return [
        {
          icon: 'mdi-chart-timeline-variant',
          title: '市内の最新感染動向',
          link: this.localePath('/')
        },
        {
          icon: 'CovidIcon',
          title: '新型コロナウイルス感染症が心配なときに',
          link: 'https://www.city.kitakyushu.lg.jp/ho-huku/18901203.html',
          divider: true
        },
        {
          icon: 'mdi-account-multiple',
          title: '市民の皆様へ',
          link: 'https://www.city.kitakyushu.lg.jp/kurashi/menu01_00279.html'
        },
        {
          icon: 'mdi-domain',
          title: '企業の皆様・はたらく皆様へ',
          link: 'https://www.city.kitakyushu.lg.jp/ho-huku/18901208.html',
          divider: true
        },
        {
          title: '北九州市の取り組み',
          link: 'https://www.city.kitakyushu.lg.jp/ho-huku/18901211.html'
        },
        {
          title: '当サイトについて',
          link: this.localePath('/about')
        },
        {
          title: 'お問い合わせ先一覧',
          link: 'https://www.city.kitakyushu.lg.jp/soumu/333_00002.html'
        },
        {
          title: '北九州市ホームページ',
          link: 'https://www.city.kitakyushu.lg.jp/'
        }
      ]
    }
  },
  watch: {
    $route: 'handleChageRoute'
  },
  methods: {
    handleChageRoute() {
      // nuxt-link で遷移するとフォーカスが残り続けるので $route を監視して SideNavigation にフォーカスする
      return this.$nextTick().then(() => {
        const $Side = this.$refs.Side as HTMLEmbedElement | undefined
        if ($Side) {
          $Side.focus()
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.SideNavigation {
  position: relative;
  @include lessThan($small) {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  }
  &:focus {
    outline: 1px dotted $gray-3;
  }
}

.SideNavigation-Header {
  height: 64px;
  padding-left: 52px;
  @include largerThan($small) {
    height: auto;
    padding: 20px;
  }
  @include lessThan($small) {
    display: flex;
  }
  @include lessThan($tiny) {
    padding-left: 44px;
  }
}

.SideNavigation-OpenIcon {
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 8px 18px 16px;
  font-size: 28px;
  @include lessThan($tiny) {
    font-size: 24px;
    padding: 20px 10px;
  }
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-CloseIcon {
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 8px 18px 16px;
  font-size: 28px;
  @include lessThan($tiny) {
    font-size: 24px;
    padding: 20px 10px;
  }
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-HeaderTitle {
  width: 100%;
  font-size: 13px;
  color: #707070;
  @include largerThan($small) {
    margin: 0;
    margin-top: 10px;
  }
}

.SideNavigation-HeaderLink {
  display: flex;
  align-items: center;
  padding-right: 10px;
  @include lessThan($small) {
    height: 64px;
  }
  @include lessThan($tiny) {
    justify-content: space-between;
  }
  &:link,
  &:hover,
  &:focus,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }

  &:hover,
  &:focus {
    font-weight: bold;
  }

  &:focus {
    outline: dotted $gray-3 1px;
  }

  @include largerThan($small) {
    display: block;
    padding: 15px 0;
  }
}

.SideNavigation-HeaderLogo {
  width: 200px;
  @include lessThan($tiny) {
    width: 100px;
  }
}

.SideNavigation-HeaderText {
  margin: 10px 0 0 0;
  @include lessThan($small) {
    margin: 0 0 0 10px;
  }

  @include lessThan($tiny) {
    margin: 0;
  }
}

.SideNavigation-Body {
  padding: 0 20px 20px;
  @include lessThan($small) {
    display: none;
    padding: 0 36px 36px;
    &.-opened {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      display: block !important;
      width: 100%;
      z-index: z-index-of(opened-side-navigation);
      background-color: $white;
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
}

.SideNavigation-Menu {
  @include lessThan($small) {
    padding-top: 50px;
  }
}

.SideNavigation-LanguageLabel {
  display: block;
  margin-bottom: 5px;
  font-size: 0.85rem;
}

.SideNavigation-Footer {
  padding-top: 20px;
}

.SideNavigation-organization {
  margin-left: 20px;
  img {
    margin-right: 10px;
  }
}

.SideNavigation-Social {
  display: flex;
}

.SideNavigation-SocialLink {
  border: 1px dotted transparent;
  border-radius: 30px;
  color: $gray-3;

  &:link,
  &:hover,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }

  &:focus {
    color: inherit;
    text-decoration: none;
    border: 1px dotted $gray-3;
    outline: none;
  }

  & + & {
    margin-left: 10px;
  }

  img {
    width: 30px;
  }
}

.SideNavigation-Copyright {
  display: block;
  margin-top: 15px;
  color: $gray-1;
  font-size: 10px;
  line-height: 1.3;
  font-weight: bold;
}

.SideNavigation-LicenseLink {
  &:focus {
    outline: 1px dotted $gray-3;
  }
}
</style>
