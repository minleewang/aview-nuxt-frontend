<template>
  <v-container>
    <h1>리뷰 작성</h1>

    <v-text-field v-model="reviewTitle" label="제목" outlined />
    <v-textarea v-model="reviewContent" label="내용" outlined rows="10" />

    <v-file-input
      v-model="reviewImage"
      label="이미지 업로드"
      accept="image/*"
    />

    <v-btn color="primary" :loading="isLoading" @click="registerReview"
      >제출하기</v-btn
    >
  </v-container>
</template>
///
<reference types="nuxt" />
<script setup lang="ts">
import { ref } from "vue";
import { useReviewStore } from "~/review/stores/reviewStore";
import { useRouter } from "vue-router";
import { createAwsS3Instance } from "~/utility/awsS3Instance";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { compressHTML } from "~/utility/compression";
import { useRuntimeConfig } from "nuxt/app";
import { v4 as uuidv4 } from "uuid";

// ✅ SEO 메타 정보
definePageMeta({
  title: "리뷰 작성 | JobStick",
  description: "JobStick 리뷰 작성 페이지입니다. 리뷰를 작성해보세요.",
  keywords: [
    "리뷰",
    "리뷰 작성",
    "리뷰 제출",
    "JobStick",
    "잡스틱",
    "job-stick",
  ],
  ogTitle: "JobStick 리뷰 작성",
  ogDescription:
    "JobStick 리뷰 작성 페이지입니다. 서비스 이용 후 리뷰를 남겨보세요.",
  ogImage: "", // 실제 이미지 경로
  robots: "index, follow", // 검색 엔진 노출 허용
});

const router = useRouter();
const reviewStore = useReviewStore();
const config = useRuntimeConfig();

const reviewTitle = ref("");
const reviewContent = ref("");
const reviewImage = ref<File | null>(null);
const isSubmitting = ref(false);
const isLoading = ref(false);

// S3에 HTML 저장
const uploadToS3 = async (html: string): Promise<string> => {
  const s3Client = createAwsS3Instance();
  const filename = `review/html/${uuidv4()}.html`;
  const compressed = await compressHTML(`<pre>${html}</pre>`);

  const params = {
    Bucket: config.public.AWS_BUCKET_NAME,
    Key: filename,
    Body: compressed,
    ContentType: "text/html",
  };
  await s3Client.send(new PutObjectCommand(params));
  return filename;
};

//이미지 업로드 후 url 반환
const UploadImageToS3 = async (file: File): Promise<string> => {
  const s3Client = createAwsS3Instance();
  const ext = file.name.split(".").pop();
  const filename = `review/images/${uuidv4()}.${ext}`;
  const params = {
    Bucket: config.public.AWS_BUCKET_NAME as string,
    Key: filename,
    Body: file,
    ContentType: file.type,
  };

  await s3Client.send(new PutObjectCommand(params));
  return `https://${config.public.AWS_BUCKET_NAME}.s3.${config.public.AWS_REGION}.amazonaws.com/${filename}`;
};

const registerReview = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    if (!reviewTitle.value || !reviewContent.value) {
      alert("제목과 내용을 입력해 주세요");
      return;
    }
    const htmlFileKey = await uploadToS3(reviewContent.value);
    let imageUrl = "";
    if (reviewImage.value) {
      imageUrl = await uploadImageToS3(reviewImage.value);
    }

    const payload = {
      title: reviewTitle.value,
      content: htmlFileKey,
      imageUrl,
      userToken: localStorage.getItem("userToken")!,
    };
    await reviewStore.requestRegisterReviewToDjango(payload);
    router.push("/review/list");
  } catch (e) {
    console.error("제출 중 오류", e);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.editor-container {
  margin-top: 20px;
}
.editor-container .ql-editor {
  min-height: 200px;
}
.ql-toolbar.ql-snow {
  border-radius: 8px 8px 0 0;
}
.ql-container.ql-snow {
  border-radius: 0 0 8px 8px;
}
</style>
