<template>
  <v-card class="DataView" :loading="loading">
    <div class="DataView-Inner">
      <div class="DataView-Header">
        <h3
          class="DataView-Title"
          :class="!!$slots.infoPanel ? 'with-infoPanel' : ''"
        >
          {{ title }}
        </h3>
        <slot name="infoPanel" />
      </div>
      <div class="DataView-Description">
        <slot name="description" />
      </div>
      <div>
        <slot name="button" />
      </div>
      <div class="DataView-CardText">
        <slot />
      </div>
      <div v-if="this.$slots.dataTable" class="DataView-Details">
        <v-expansion-panels v-if="showDetails" flat>
          <v-expansion-panel>
            <v-expansion-panel-header
              :hide-actions="true"
              :style="{ transition: 'none' }"
              @click="toggleDetails"
            >
              <template slot:actions>
                <div class="v-expansion-panel-header__icon">
                  <v-icon left>mdi-chevron-right</v-icon>
                </div>
              </template>
              <span class="expansion-panel-text">
                {{ $t('テーブルを表示') }}
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <slot name="dataTable" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <template v-else>
          <slot name="dataTable" />
        </template>
      </div>
      <div class="DataView-Description">
        <slot name="footer-description" />
      </div>
      <div class="DataView-Footer">
        <div class="Footer-Left">
          <slot name="footer" />
          <div>
            <p class="Permalink">
              <time :datetime="formattedDate">
                {{ $t('{date} 更新', { date }) }}
              </time>
            </p>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { convertDatetimeToISO8601Format } from '@/utils/formatDate'
import { EventBus, TOGGLE_EVENT } from '@/utils/card-event-bus'
export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      showDetails: false,
      openDetails: false
    }
  },
  computed: {
    formattedDate(): string {
      return convertDatetimeToISO8601Format(this.date)
    },
    permalink(): string {
      const permalink = '/cards/' + this.titleId
      return this.localePath(permalink)
    }
  },
  beforeUpdate() {
    this.showDetails = true
  },
  methods: {
    toggleDetails() {
      this.openDetails = !this.openDetails
      EventBus.$emit(TOGGLE_EVENT, { dataView: this.$refs.dataView })
    }
  }
})
</script>

<style lang="scss">
/* stylelint-disable no-descending-specificity */

.DataView {
  @include card-container();

  height: 100%;

  .LegendStickyChart {
    margin: 16px 0;
    position: relative;
    overflow: hidden;
    .scrollable {
      overflow-x: scroll;
      &::-webkit-scrollbar {
        height: 4px;
        background-color: rgba(0, 0, 0, 0.01);
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.07);
      }
    }
    .sticky-legend {
      position: absolute;
      top: 0;
      pointer-events: none;
    }
  }

  &-Header {
    display: flex;
    align-items: flex-start;
    flex-flow: column;
    padding: 0 10px;

    @include largerThan($medium) {
      padding: 0 5px;
    }

    @include largerThan($large) {
      width: 100%;
      flex-flow: row;
      flex-wrap: wrap;
      padding: 0;
    }
  }

  &-DataInfo {
    &-summary {
      color: $gray-2;
      font-family: Hiragino Sans, sans-serif;
      font-style: normal;
      font-size: 30px;
      line-height: 30px;
      white-space: nowrap;

      &-unit {
        font-size: 0.6em;
        width: 100%;
      }
    }

    &-date {
      font-size: 12px;
      line-height: 12px;
      color: $gray-3;
      width: 100%;
      display: inline-block;
    }
  }

  &-Inner {
    display: flex;
    flex-flow: column;
    padding: 22px;
    height: 100%;
  }

  &-Title {
    width: 100%;
    margin-bottom: 10px;
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: normal;
    color: $gray-2;

    @include largerThan($large) {
      margin-bottom: 0;
      &.with-infoPanel {
        width: 50%;
      }
    }
  }

  &-CardText {
    margin: 16px 0;
  }

  &-Description {
    margin: 10px 0 0;
    font-size: 12px;
    color: $gray-3;

    ul,
    ol {
      list-style-type: none;
      padding: 0;
    }
  }

  &-Details {
    margin: 10px 0;

    .v-data-table .text-end {
      text-align: right;
    }
  }

  &-DetailsSummary {
    @include font-size(14);

    color: $gray-2;
    cursor: pointer;
  }

  &-CardTextForXS {
    margin-bottom: 46px;
    margin-top: 70px;
  }

  &-Embed {
    background-color: $gray-5;
  }

  &-Footer {
    @include font-size(12);

    padding: 0 !important;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    color: $gray-3 !important;
    text-align: right;
    background-color: $white !important;

    .Permalink {
      color: $gray-3 !important;
    }

    .OpenDataLink {
      text-decoration: none;

      .ExternalLinkIcon {
        vertical-align: text-bottom;
      }
    }

    .Footer-Left {
      text-align: left;
    }

    .Footer-Right {
      position: relative;
      display: flex;
      align-items: flex-end;

      .DataView-Share-Opener {
        cursor: pointer;
        margin: -14px;
        padding: 14px;

        > svg {
          width: auto !important;
        }

        &:focus {
          outline: dotted $gray-3 1px;
        }
      }

      .DataView-Share-Buttons {
        position: absolute;
        padding: 8px;
        right: -4px;
        bottom: 1.5em;
        width: 240px;
        border: solid 1px $gray-4;
        background: $white !important;
        border-radius: 8px;
        text-align: left;
        font-size: 1rem;
        z-index: 2;

        > * {
          padding: 4px 0;
        }

        > .Close-Button {
          display: flex;
          justify-content: flex-end;
          color: $gray-3;

          button {
            border-radius: 50%;
            border: 1px solid #fff;

            &:focus {
              border: 1px dotted #707070;
              outline: none;
            }
          }
        }

        > .EmbedCode {
          position: relative;
          padding: 4px;
          padding-right: 30px;
          color: rgb(3, 3, 3);
          border: solid 1px #eee;
          border-radius: 8px;
          font-size: 12px;

          .EmbedCode-Copy {
            position: absolute;
            top: 0.3em;
            right: 0.3em;
            color: $gray-3;
          }

          button {
            border-radius: 50%;
            border: solid 1px #eee;

            &:focus {
              border: 1px dotted #707070;
              outline: none;
            }
          }
        }

        > .Buttons {
          display: flex;
          justify-content: center;
          margin-top: 4px;

          .icon-resize {
            border-radius: 50%;
            font-size: 30px;

            &.twitter {
              color: #fff;
              background: #2a96eb;
            }

            &.facebook {
              color: #364e8a;
            }

            &.line {
              color: #1cb127;
            }
          }

          button {
            width: 30px;
            height: 30px;
            margin-left: 4px;
            margin-right: 4px;

            &:focus {
              border-radius: 50%;
              border: 1px dotted #707070;
              outline: none;
            }
          }
        }
      }
    }
  }

  .overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    user-select: none;
    opacity: 0.8;

    > .overlay-text {
      text-align: center;
      padding: 2em;
      width: 60%;
      background: $gray-2;
      border-radius: 8px;
      color: $white !important;
    }
  }
}

textarea {
  font: 400 11px system-ui;
  width: 100%;
  height: 2.4rem;
}
</style>
