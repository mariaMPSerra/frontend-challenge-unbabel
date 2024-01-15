<template>
  <div
    class="transcriptions__item"
    @mouseover="showDelete(item?.id)"
    @mouseleave="showDelete(null)"
  >
    <div class="transcriptions__item__header">
      <div class="transcriptions__item__header__left">
        <input :id="item?.id" type="checkbox" class="transcriptions__item__checkbox" />
        <img src="@/assets/icons/person.svg" />
        <input
          v-if="showInput('voice') || !item?.id"
          v-model="voice"
          class="transcriptions__item__input title"
          placeholder="New Item voice"
          v-focus
          @focus="setActiveInput('voice')"
          @blur="setActiveInput(null)"
        />
        <span v-else @click="handleInput('voice')" class="transcriptions__item__title">
          {{ item?.voice }}</span
        >
      </div>
      <button
        @click.stop="emit('removeItem', item?.id)"
        v-if="(hoveredItem === item?.id || !isDesktopScreen) && item?.id"
      >
        <img src="@/assets/icons/delete.svg" />
      </button>
      <button
        v-if="!item?.id"
        @click="emit('add-item', { voice, text })"
        class="transcriptions__item__add desktop"
      >
        <span>Add</span>
      </button>
    </div>
    <textarea
      v-if="showInput('content') || !item?.id"
      v-model="text"
      placeholder="New Item Description"
      class="transcriptions__item__input content"
      v-focus
      @focus="setActiveInput('content')"
      @blur="setActiveInput(null)"
    />
    <p v-else class="transcriptions__item__content" @click="handleInput('content')">
      {{ item?.text }}
    </p>

    <button
      v-if="!item?.id"
      @click="emit('add-item', { voice, text })"
      class="transcriptions__item__add mobile"
    >
      <span>Add</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { vFocus } from '@/directives/vFocus'
import { ref, computed } from 'vue'

const props = defineProps({
  rowItem: Object
})

const emit = defineEmits(['removeItem', 'add-item'])

const item = ref(props.rowItem)
const text = ref(item.value?.text)
const voice = ref(item.value?.voice)
const activeInput = ref<string | null>(null)
const hoveredItem = ref<number | null>(null)

const isDesktopScreen = computed(() => window?.screen?.width >= 600)

const showDelete = (id: number | null) => {
  hoveredItem.value = id
}

const showInput = (inputType: string) => {
  return activeInput.value === inputType
}

const handleInput = (inputType: string) => {
  activeInput.value = activeInput.value === inputType ? null : inputType
}

const setActiveInput = (inputType: string | null) => {
  activeInput.value = inputType
}
</script>
<style lang="scss">
.transcriptions {
  &__item {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;

    &:not(:last-child) {
      border-bottom: 1px solid $border-color;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      color: $purple;
      font-weight: 600;
      flex-grow: 1;

      &__left {
        display: flex;
        align-items: center;
      }
    }

    &__title {
      margin-left: 10px;

      @media (max-width: 600px) {
        max-width: 130px;
      }
    }

    &__content {
      @media (min-width: 600px) {
        margin-left: 70px;
      }
    }

    &__content,
    &__input {
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      color: $gray-purple;
    }

    &__input.content {
      resize: none;
      margin-top: 16px;
      margin-bottom: 16px;
      flex-grow: 1;

      @media (min-width: 600px) {
        margin-left: 70px;
      }
    }

    &__input.title {
      margin-left: 10px;

      @media (max-width: 600px) {
        max-width: 130px;
      }
    }

    &__checkbox {
      height: 16px;
      width: 16px;
      accent-color: $light-purple;
      margin-right: 15px;
    }

    &__add {
      background-color: $light-purple;
      color: $white;
      padding: 5px 10px;
      border-radius: 5px;
      text-transform: uppercase;

      &:hover {
        background-color: darken($light-purple, 10%);
      }

      &.mobile {
        @media (min-width: 600px) {
          display: none;
        }
      }

      &.desktop {
        @media (max-width: 600px) {
          display: none;
        }
      }
    }
  }
}
</style>
